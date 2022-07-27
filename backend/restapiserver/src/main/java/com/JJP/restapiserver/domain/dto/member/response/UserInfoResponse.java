package com.JJP.restapiserver.domain.dto.member.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoResponse {

    private Long id;
    private String username; // email 주소
    private String nickname;
    private String user_img;
    private String role;

}
