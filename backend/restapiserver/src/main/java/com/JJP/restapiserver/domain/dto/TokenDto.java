package com.JJP.restapiserver.domain.dto;

import lombok.*;

/**
 * 클라이언트에 토큰 정보 전송을 위한 Dto 생성
 */

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TokenDto {
    private String token;
}
