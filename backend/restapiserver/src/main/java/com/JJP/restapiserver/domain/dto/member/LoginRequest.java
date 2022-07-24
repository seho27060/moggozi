package com.JJP.restapiserver.domain.dto.member;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;


@Getter
@Setter
public class LoginRequest {
    @NotBlank
    private String username; // email 주소

    @NotBlank
    private String password;
}
