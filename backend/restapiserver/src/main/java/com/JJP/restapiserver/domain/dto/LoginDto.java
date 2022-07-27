package com.JJP.restapiserver.domain.dto;


import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Login 시 외부와 통신할 Dto (객체 형태 - JSON의 키와 일치)
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginDto {

    @NotNull
    @Size(min = 3, max = 30)
    private String email;

    @NotNull
    @Size(min = 3, max = 100)
    private String password;

}
