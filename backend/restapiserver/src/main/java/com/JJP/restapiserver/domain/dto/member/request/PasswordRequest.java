package com.JJP.restapiserver.domain.dto.member.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PasswordRequest {

    @NotBlank
    private String username; // email 주소

}
