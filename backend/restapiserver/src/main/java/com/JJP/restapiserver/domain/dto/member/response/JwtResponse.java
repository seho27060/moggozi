package com.JJP.restapiserver.domain.dto.member.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

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
    private List<String> roles;

    public JwtResponse(String token, String refreshToken, Long id, String username
            , String fullname, List<String> roles) {
        this.token = token;
        this.refreshToken = refreshToken;
        this.id = id;
        this.username = username;
        this.fullname = fullname;
        this.roles = roles;
    }


}
