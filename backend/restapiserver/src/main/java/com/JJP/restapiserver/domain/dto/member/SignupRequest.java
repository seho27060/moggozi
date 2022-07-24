package com.JJP.restapiserver.domain.dto.member;


import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Set;

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

    private Set<String> role;

}
