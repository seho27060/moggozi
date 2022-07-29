package com.JJP.restapiserver.domain.dto.member;

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
        return ofGoogle(usernameAttributeName, attributes);
    }

    public static OAuthAttributes ofGoogle(String usernameAttributeName, Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .attributes(attributes)
                .nameAttributeKey(usernameAttributeName).build();
    }

//    public Member toEntity() {
//        return Member.builder()
//                .username(email)
//                .fullname(name)
//                .role(new Role(ERole.ROLE_USER))
//                .build();
//    }
}
