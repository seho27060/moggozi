package com.JJP.restapiserver.domain.dto.member.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MemberResponseDto {
    private Long id;
    private String nickname;
    private String img;
}
