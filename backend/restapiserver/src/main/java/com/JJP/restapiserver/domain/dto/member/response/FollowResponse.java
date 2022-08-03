package com.JJP.restapiserver.domain.dto.member.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FollowResponse {

    private Long id;
    private String username;
    private String nickname;
    private String userImgUrl;
    private int followState;

}
