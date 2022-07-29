package com.JJP.restapiserver.domain.dto.challenge;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChallengeCompleteRequestDto {
    public Long user_id;
    public Long challenge_id;

}
