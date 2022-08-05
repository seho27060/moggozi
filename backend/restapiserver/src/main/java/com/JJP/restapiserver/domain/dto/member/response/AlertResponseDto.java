package com.JJP.restapiserver.domain.dto.member.response;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class AlertResponseDto {
    private Long id;
    private Long senderId;
    private String senderName;
    private Long receiverId;
    private String receiverName;
    private String type;
    private Long index;
    private String message;

    @Override
    public String toString(){
        String str = "{ \"id\" : " + this.id + ", \"senderId\" : "+this.senderId +
                ", \"senderName\" : "+this.senderName +
                ", \"receiverId\" : "+this.receiverId +
                ", \"receiverName\" : "+this.receiverName +
                ", \"type\" : "+this.type +
                ", \"index\" : "+this.index +
                ", \"message\" : "+this.message + "}";
        return str;
    }
}
