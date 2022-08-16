package com.JJP.restapiserver.service.challenge;

import com.JJP.restapiserver.domain.dto.challenge.ReviewRequestDto;
import com.JJP.restapiserver.domain.dto.challenge.ReviewResponseDto;
import com.JJP.restapiserver.domain.dto.challenge.ReviewResponsePageDto;
import com.JJP.restapiserver.domain.dto.challenge.ReviewUpdateRequestDto;
import com.JJP.restapiserver.domain.entity.challenge.Review;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ReviewService {
    ReviewResponseDto registerReview(ReviewRequestDto reviewRequestDto);

    ReviewResponsePageDto getReviewList(Long challenge_id, Pageable pageable);

    ReviewResponseDto updateReview(ReviewUpdateRequestDto reviewUpdateRequestDto);
    ResponseEntity deleteReview(Long review_id);
}
