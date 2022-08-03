package com.JJP.restapiserver.service;


import com.JJP.restapiserver.security.OAuthAttributes;
import com.JJP.restapiserver.domain.entity.member.Member;
import com.JJP.restapiserver.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.Collections;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final MemberRepository memberRepository;
    private final HttpSession httpSession;

    // 대리자 생성
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate =
                new DefaultOAuth2UserService();

        // AccessToken으로 회원정보를 로드하겠다. (받아오겠다)
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        // 서비스 제공자
        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        String userNameAttributeName =  userRequest.getClientRegistration().getProviderDetails()
                .getUserInfoEndpoint().getUserNameAttributeName();

        OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName, oAuth2User.getAttributes());

        Optional<Member> member = memberRepository.findByUsername(attributes.getEmail());

        return new DefaultOAuth2User(Collections.singleton(
                new SimpleGrantedAuthority("ROLE_USER"))
                , attributes.getAttributes(), attributes.getNameAttributeKey());
    }
}
