package com.JJP.restapiserver.security;

import com.JJP.restapiserver.domain.entity.member.Member;
import com.JJP.restapiserver.domain.entity.member.MemberScore;
import com.JJP.restapiserver.domain.entity.member.Role;
import com.JJP.restapiserver.repository.member.MemberRepository;
import com.JJP.restapiserver.repository.member.MemberScoreRepository;
import com.JJP.restapiserver.repository.member.RoleRepository;
import com.JJP.restapiserver.service.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Optional;
import java.util.Random;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    static final Logger logger = LoggerFactory.getLogger(OAuth2SuccessHandler.class);

    // 토큰 생성

    private final JwtUtils jwtUtils;

    // 리프레시 토큰 생성

    private final RefreshTokenService refreshTokenService;

    private final MemberRepository memberRepository;
    private final RoleRepository roleRepository;
    private final MemberScoreRepository memberScoreRepository;

    PasswordEncoder encoder = new BCryptPasswordEncoder();

    private final RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response
            , Authentication authentication) throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User) (DefaultOAuth2User) authentication.getPrincipal();

        String username = null, fullname = null, nickname = null;

        // 카카오의 attributes 객체의 형태가 구글과 네이버와 다르기 때문에 username과 fullname을 얻는 방법을 달리해야 한다.
        if (!oAuth2User.getAttributes().containsKey("email")) { // 카카오로 로그인 한 경우
            username = (String) ((HashMap<String, Object>) ((OAuth2User) authentication.getPrincipal())
                    .getAttributes().get("kakao_account"))
                    .get("email");
            fullname = (String) ((HashMap<String, Object>) ((OAuth2User) authentication.getPrincipal())
                    .getAttributes().get("properties"))
                    .get("nickname");
            nickname = fullname;
        } else { // 네이버나 구글로 로그인 한 경우
            username = oAuth2User.getAttributes().get("email").toString();
            fullname = oAuth2User.getAttributes().get("name").toString();
            nickname = fullname;
        }

        Optional<Member> member = memberRepository.findByUsername(username);
        int isFirst = 0;  // 처음 회원가입하는 유저인지를 표시하는 변수

        String password = encoder.encode(username.split("@")[0] + "1234");
//        String url = "http://localhost:8080"; /** 추후 주소 변경 필요 **/
        String url = "http://localhost:3000/oauth/callback";

        if (member.isEmpty()) {
            // 유저 객체 만들기
            Random random = new Random();

            String randomNo = random.ints(33, 123)
                    .limit(2)
                    .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                    .toString();

            isFirst = 1;

            Role role = roleRepository.findById(1L).get();

            /** TODO: Role의 값이 1로 매칭되지 않는 문제 - 권한 부여 시 잘 체크되는지 필요) */
            Member newMember = Member.builder().username(username)
                    .fullname(fullname).nickname("User" + randomNo).password(password).is_social(1).role(role).build();

            memberRepository.saveAndFlush(newMember);
            member = memberRepository.findByUsername(username);

            // 새로 등록된 유저를 MemberScore 테이블에 등록한다.
            MemberScore memberScore = MemberScore.builder()
                    .id(member.get().getId())
                    .score(0L)
                    .build();
            memberScoreRepository.save(memberScore);


        } else {
            nickname = member.get().getNickname(); /** TODO: 추후 리팩토링 시 삭제 필요 */
        }

        String jwtToken = jwtUtils.generateTokenFromUsername(username);


        String uri = UriComponentsBuilder.fromUriString(url)
                .queryParam("accessToken", jwtToken)
                .queryParam("isFirst", isFirst)
                .build().toUriString();

        if (response.isCommitted()) {
            logger.debug(
                    "Response has already been committed. Unable to redirect to "
                            + url);
            return;
        }

        redirectStrategy.sendRedirect(request, response, uri);
    }
}
