package com.JJP.restapiserver.domain.dto.admin;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminLoginRequest {
    String username;
    String password;
}
