package com.JJP.restapiserver.security;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Map;

// 서비스되는 API에 따른 유저정보얻기 및 반환
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OAuthAttributes {

    private Map<String, Object> attributes;

    private String nameAttributeKey;
    private String name;
    private String email;

    public static OAuthAttributes of(String registrationId, String usernameAttributeName, Map<String, Object> attributes) {

        switch(registrationId) {
            case "google":
                return ofGoogle(usernameAttributeName, attributes);
            case "naver":
                return ofNaver("id", attributes);
            case "kakao":
                return ofKakao("id", attributes);
        }
        return null;
    }

    public static OAuthAttributes ofGoogle(String usernameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .attributes(attributes)
                .nameAttributeKey(usernameAttributeName)
                .build();
    }

    private static OAuthAttributes ofKakao(String usernameAttributeName, Map<String, Object> attributes) {
        Map<String, Object> kakaoAccount = (Map<String, Object>)attributes.get("kakao_account");
        Map<String, Object> kakaoProfile = (Map<String, Object>)kakaoAccount.get("profile");

        return OAuthAttributes.builder()
                .name((String) kakaoProfile.get("nickname"))
                .email((String) kakaoAccount.get("email"))
                .attributes(attributes)
                .nameAttributeKey(usernameAttributeName)
                .build();
    }

    private static OAuthAttributes ofNaver(String usernameAttributeName, Map<String, Object> attributes) {
        // JSON형태이기 떄문에 Map을 통해서 데이터를 가져온다.
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");
        return OAuthAttributes.builder()
                .name((String) response.get("name"))
                .email((String) response.get("email"))
                .attributes(response)
                .nameAttributeKey(usernameAttributeName)
                .build();
    }

//    public Member toEntity() {
//        return Member.builder()
//                .username(email)
//                .fullname(name)
//                .role(new Role(ERole.ROLE_USER))
//                .build();
//    }
}
