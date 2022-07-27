package com.JJP.restapiserver.domain.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageResponse {

    private String message; // 클라이언트에게 응답할 메시지

    public MessageResponse(String message) {
        this.message = message;
    }
}
