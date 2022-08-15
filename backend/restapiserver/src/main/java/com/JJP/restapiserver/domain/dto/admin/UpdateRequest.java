package com.JJP.restapiserver.domain.dto.admin;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateRequest {

    Long memberId;
    String username;
    String fullname;
    String nickname;
    String introduce;
    String userImg;
    int isPrivate;
    String role;
}
