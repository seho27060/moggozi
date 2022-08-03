package com.JJP.restapiserver.domain.dto.member.request;

import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PasswordRequest {

    @NotBlank
    private String username;

    @NotBlank
    private String fullname;

}
