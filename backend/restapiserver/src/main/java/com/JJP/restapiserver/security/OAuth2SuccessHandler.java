package com.JJP.restapiserver.security;

import com.JJP.restapiserver.domain.entity.member.Member;
import com.JJP.restapiserver.repository.member.MemberRepository;
import com.JJP.restapiserver.service.RefreshTokenService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    static final Logger logger = LoggerFactory.getLogger(OAuth2SuccessHandler.class);

    // 토큰 생성
    @Autowired
    private JwtUtils jwtUtils;

    // 리프레시 토큰 생성
    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    MemberRepository memberRepository;

    PasswordEncoder encoder = new BCryptPasswordEncoder();

    private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response
            , Authentication authentication) throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User) (DefaultOAuth2User) authentication.getPrincipal();
        System.out.println("quthentication" + oAuth2User.getAttributes().toString());

        String username = null, fullname = null, nickname = null;

        // 카카오의 attributes 객체의 형태가 구글과 네이버와 다르기 때문에 username과 fullname을 얻는 방법을 달리해야 한다.
        if(!oAuth2User.getAttributes().containsKey("email")) { // 카카오로 로그인 한 경우
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
        int enrolled = 0;
        String password = encoder.encode(username.split("@")[0] + "1234");
//        String url = "http://localhost:8080"; /** 추후 주소 변경 필요 **/
        String url = "https://i7c201.p.ssafy.io/oauth/callback";

        if(member.isEmpty()) {
            // 유저 객체 만들기
            enrolled = 1;
            Member newMember = Member.builder().username(username)
                    .fullname(fullname).nickname(nickname).password(password).is_social(1).build();
            memberRepository.save(newMember);
            member = memberRepository.findByUsername(username);

            /** 추후 사용자 페이지로 리다이렉트 필요 **/
            // 사용자 수정 페이지로 리다이렉트 URL
//            url = "http://localhost:8080/user/update";
//            url = "http://i7c201.p.ssafy.io:8080/user/register";
        } else {
            // 메인페이지로 redirect URL
            nickname = member.get().getNickname();
//            url = "http://localhost:8080";
//            url = "http://i7c201.p.ssafy.io:8081;
        }

        String jwtToken = jwtUtils.generateOAuthJwtToken(oAuth2User);

        String uri = UriComponentsBuilder.fromUriString(url)
                .queryParam("accessToken", jwtToken)
                .queryParam("enrolled", enrolled)
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
