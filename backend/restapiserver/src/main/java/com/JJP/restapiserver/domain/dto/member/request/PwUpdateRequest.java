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
public class PwUpdateRequest {

    @NotBlank
    private String currentPassword;

    @NotBlank
    private String changedPassword;

}
