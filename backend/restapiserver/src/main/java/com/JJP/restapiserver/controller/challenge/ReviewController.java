package com.JJP.restapiserver.controller.challenge;

import com.JJP.restapiserver.domain.dto.ReviewRequestDto;
import com.JJP.restapiserver.domain.dto.ReviewUpdateRequestDto;
import com.JJP.restapiserver.domain.entity.challenge.Review;
import com.JJP.restapiserver.service.challenge.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/register")
    public ResponseEntity registerReview(@RequestBody ReviewRequestDto reviewRequestDto)
    {
        return reviewService.registerReview(reviewRequestDto);
    }

    @GetMapping("/{challenge_id}")
    public ResponseEntity getReviewList(@PathVariable Long challenge_id)
    {
        List<Review> reviewList = reviewService.getReviewList(challenge_id);
        return new ResponseEntity(reviewList, HttpStatus.OK);
    }

    @PutMapping("/{challenge_id}")
    public ResponseEntity updateReview(ReviewUpdateRequestDto reviewUpdateRequestDto)
    {
        return reviewService.updateReview(reviewUpdateRequestDto);
    }

    @DeleteMapping("/{challenge_id}")
    public ResponseEntity deleteReview(@PathVariable Long review_id)
    {
        return reviewService.deleteReview(review_id);
    }



}
