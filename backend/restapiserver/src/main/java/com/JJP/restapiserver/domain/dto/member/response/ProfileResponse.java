package com.JJP.restapiserver.domain.dto.member.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileResponse {

    private Long id;
    private String nickname;
    private String introduce;
    private String userImg;
    private int isPrivate;

    private int followedCnt;
    private int followingCnt;

    private int isFollowing;

}
