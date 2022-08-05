package com.JJP.restapiserver.domain.dto.member.response;

public interface Followed {

    Long getId();
    String getUsername();
    String getNickname();
    String getUserImg();
    int getLoginFollowState();

}
