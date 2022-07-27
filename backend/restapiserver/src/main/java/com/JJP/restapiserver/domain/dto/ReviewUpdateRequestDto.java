package com.JJP.restapiserver.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewUpdateRequestDto {
    private Long review_id;
    private String review_content;
    private int rate;

}