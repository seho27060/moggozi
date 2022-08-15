package com.JJP.restapiserver.domain.dto.member.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AlertRequestDto {
    private Long senderId;
    private Long receiverId;
    private String type;
    private Long index;
    private String msg;
}
