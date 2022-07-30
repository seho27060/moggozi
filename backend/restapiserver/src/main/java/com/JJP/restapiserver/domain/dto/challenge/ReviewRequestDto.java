package com.JJP.restapiserver.domain.dto.challenge;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReviewRequestDto {
    private String review_content;
    private int rate;
    private Long member_id;
    private Long challenge_id;

}
