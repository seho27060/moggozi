package com.JJP.restapiserver.domain.dto.member.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class JwtResponse {

    private String accessToken;
    private String type = "Bearer";
    private String refreshToken;
    private Long id;
    private String username; // email
    private String nickname;

    @Builder
    public JwtResponse(String accessToken, String refreshToken, Long id, String username
            , String nickname) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.id = id;
        this.username = username;
        this.nickname = nickname;
    }
}
