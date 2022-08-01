package com.JJP.restapiserver.domain.dto.challenge;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChallengeCompleteRequestDto {
    public Long member_id;
    public Long challenge_id;

}
