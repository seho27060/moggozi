package com.JJP.restapiserver.domain.dto.challenge;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewUpdateRequestDto {
    private Long reviewId;
    private String reviewContent;
    private int rate;

}