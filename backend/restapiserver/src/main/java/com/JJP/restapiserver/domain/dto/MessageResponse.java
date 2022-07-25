package com.JJP.restapiserver.domain.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MessageResponse {

    private String message; // 클라이언트에게 응답할 메시지

    public MessageResponse(String message) {
        this.message = message;
    }
}
