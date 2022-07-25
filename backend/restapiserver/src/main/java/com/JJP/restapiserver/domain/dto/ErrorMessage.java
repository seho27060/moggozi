package com.JJP.restapiserver.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ErrorMessage {
    private int statusCode;             // 에러 코드
    private Date timestamp;             // 에러 발생 시간
    private String message;             // 에러 메시지
    private String description;         // 에러 설명
}