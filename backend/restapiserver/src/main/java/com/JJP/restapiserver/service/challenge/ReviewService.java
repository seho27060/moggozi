package com.JJP.restapiserver.service.challenge;

import com.JJP.restapiserver.domain.dto.ReviewRequestDto;
import com.JJP.restapiserver.domain.dto.ReviewUpdateRequestDto;
import com.JJP.restapiserver.domain.entity.challenge.Review;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ReviewService {
    ResponseEntity registerReview(ReviewRequestDto reviewRequestDto);
    List<Review> getReviewList(Long challenge_id);
    ResponseEntity updateReview(ReviewUpdateRequestDto reviewUpdateRequestDto);
    ResponseEntity deleteReview(Long review_id);
}
