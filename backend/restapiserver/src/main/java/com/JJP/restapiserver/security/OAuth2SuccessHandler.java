package com.JJP.restapiserver.security;

import com.JJP.restapiserver.domain.entity.member.Member;
import com.JJP.restapiserver.repository.member.MemberRepository;
import com.JJP.restapiserver.service.RefreshTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    // 토큰 생성
    @Autowired
    private JwtUtils jwtUtils;

    // 리프레시 토큰 생성
    @Autowired
    private RefreshTokenService refreshTokenService;

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    PasswordEncoder encoder;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response
            , Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String username = oAuth2User.getAttributes().get("email").toString();
        String fullname = oAuth2User.getAttributes().get("name").toString();
        String nickname = fullname;
        Optional<Member> member = memberRepository.findByUsername(username);

        String password = encoder.encode(username.split("@")[0] + "1234");
        UserDetails userDetail = null;
        String uri = null;

        if(member.isEmpty()) {

            // 유저 객체 만들기
            nickname = fullname;
            Member newMember = Member.builder().username(username)
                    .fullname(fullname).nickname(fullname).password(password).build();
            memberRepository.save(newMember);
            userDetail = UserDetailsImpl.build(newMember);

            /** 추후 사용자 페이지로 리다이렉트 필요 **/
            // 사용자 수정 페이지로 리다이렉트 URL
            UriComponentsBuilder.fromUriString("http://localhost:8080/main").build().toUriString();

        } else {
            userDetail = UserDetailsImpl.build(member.get());
            // 메인페이지로 redirect URL
        }

        String jwtToken = jwtUtils.generateJwtToken(userDetail);
        response.addHeader("accessToken", jwtToken);


    }

}
