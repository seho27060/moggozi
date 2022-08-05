package com.JJP.restapiserver.domain.dto.member.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FollowedListResponse {
    int totalCount;
    List<Followed> memberInfoList;
}
