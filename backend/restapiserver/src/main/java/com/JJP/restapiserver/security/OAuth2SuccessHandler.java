package com.JJP.restapiserver.security;

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
//        oAuth2User.
//        memberRepository.findByUsername(oAuth2User.)

    }
}
