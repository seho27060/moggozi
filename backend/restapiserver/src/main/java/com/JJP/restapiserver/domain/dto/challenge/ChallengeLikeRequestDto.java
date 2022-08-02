package com.JJP.restapiserver.domain.dto.challenge;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ChallengeLikeRequestDto {
    private Long memberId;
    private Long challengeId;
}
