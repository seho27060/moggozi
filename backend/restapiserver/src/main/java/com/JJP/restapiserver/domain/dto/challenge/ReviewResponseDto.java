package com.JJP.restapiserver.domain.dto.challenge;

import com.JJP.restapiserver.domain.entity.challenge.Review;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ReviewResponseDto {
    private Long id;
    private String reviewContent;
    private int rate;
    private LocalDateTime createdTime;
    private LocalDateTime modifiedTime;
    public ReviewResponseDto(Review review)
    {
        this.id = review.getId();
        this.reviewContent = review.getReview_content();
        this.rate = review.getRate();
        this.createdTime = review.getCreated_date();
        this.modifiedTime = review.getModified_date();
    }
}
