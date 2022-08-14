package com.JJP.restapiserver.domain.dto.challenge;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Builder
@Setter
public class ChallengeSimpleResponseDto {
    private Long id;
    private String img;
    private int level;
    private int state;
    private String name;
}
