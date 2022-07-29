package com.JJP.restapiserver.security;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

@NoArgsConstructor
@AllArgsConstructor
public class GetUserInfo {

    @Autowired
    private JwtUtils jwtUtils;           // JWT 토큰을 분해, 생성, 유효한 토큰 검증 등을 수행하는 클래스이다.
    @Autowired
    private UserDetailsServiceImpl userDetailsService;


}
