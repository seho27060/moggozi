package com.JJP.restapiserver.domain.dto.challenge;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReviewRequestDto {
    private String reviewContent;
    private int rate;
    private Long memberId;
    private Long challengeId;

}
