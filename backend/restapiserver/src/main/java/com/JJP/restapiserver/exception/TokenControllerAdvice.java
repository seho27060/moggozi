package com.JJP.restapiserver.exception;

import com.JJP.restapiserver.domain.dto.ErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;

// 예외 발생 시 응답을 JSON 객체로 반환하게 한다. - RestConttrollerAdvice
@RestControllerAdvice
public class TokenControllerAdvice {

    // TokenRefreshException이 발생했을 때 예외처리를 해주는 방식을 정의해주겠다는 것
    @ExceptionHandler(value = TokenRefreshException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public ErrorMessage handleTokenRefreshException(TokenRefreshException ex, WebRequest request) {
        return new ErrorMessage(HttpStatus.FORBIDDEN.value(), new Date()
                , ex.getMessage(), request.getDescription(false));
    }
}
