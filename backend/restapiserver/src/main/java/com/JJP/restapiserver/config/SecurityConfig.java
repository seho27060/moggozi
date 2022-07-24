package com.JJP.restapiserver.config;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@EnableWebSecurity // 웹 보안 활성화
public class SecurityConfig extends WebSecurityConfigurerAdapter { // 추가적 설정을 위해 WebSecurityConfigurerAdapter extends

    // h2 console을 이용하기 위한 설정 - h2 console 요청 및 favicon 무시
    // - 추후 db 변경 후 삭제 예정
    @Override
    public void configure(WebSecurity web) {
        web
                .ignoring()
                .antMatchers("/h2-console/**", "/favicon.ico");

    }

    // Http 접근 허용을 위한 설정
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.
                authorizeRequests()                                      // HttpServletRequest를 사용하는 요청에 대해 접근 제한을 설정하고자 한다.
                .antMatchers("/user").permitAll()             // "/user"로의 접근에 대해서는 인증없이 모든 접근을 허용한다.
                .anyRequest().authenticated();                          // 그리고 나머지 어떤 요청에 대해서는 모두 인증을 받아야 한다.
    }

}
