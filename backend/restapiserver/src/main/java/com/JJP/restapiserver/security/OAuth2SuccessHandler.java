package com.JJP.restapiserver.security;

import com.JJP.restapiserver.domain.entity.member.Member;
import com.JJP.restapiserver.repository.member.MemberRepository;
import com.JJP.restapiserver.service.RefreshTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

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


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String username = oAuth2User.getAttributes().get("email").toString();
        Optional<Member> member = memberRepository.findByUsername(username);

        if(member.isEmpty()) { // 가입되지 않은 사용자

        } else { // 가입된 사용자
//            response.addHeader("userId", );
        }
    }

    private class unsignedUser {
        String username;
        String fullname;

        public unsignedUser(String username, String fullname) {
            this.username = username;
            this.fullname = fullname;
        }
    }
}
