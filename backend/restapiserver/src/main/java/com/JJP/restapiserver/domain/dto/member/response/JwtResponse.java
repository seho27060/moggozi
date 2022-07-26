package com.JJP.restapiserver.domain.dto.member.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class JwtResponse {

    private String token;
    private String type = "Bearer";
    private String refreshToken;
    private Long id;
    private String username; // email
    private String fullname;
    private Long role;

    public JwtResponse(String token, String refreshToken, Long id, String username
            , String fullname, Long role) {
        this.token = token;
        this.refreshToken = refreshToken;
        this.id = id;
        this.username = username;
        this.fullname = fullname;
        this.role = role;
    }


}
