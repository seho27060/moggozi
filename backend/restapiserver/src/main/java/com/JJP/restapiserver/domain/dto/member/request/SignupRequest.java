package com.JJP.restapiserver.domain.dto.member.request;


import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
public class SignupRequest {

    @NotBlank
    @Size(min = 3, max = 30)
    private String username; // email

    @NotBlank
    @Size(max = 20)
    private String fullname;

    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

    @NotBlank
    @Size(min = 3, max = 10)
    private String nickname;

    @Size(max = 100)
    private String introduce;

    @Size(max = 300)
    private String user_img;

    private int is_private; // 0: 공개 X, 1: 공개 O

//    private Set<String> role;

    private Long role = null;
}
