package com.JJP.restapiserver.controller.challenge;

import com.JJP.restapiserver.domain.dto.challenge.ReviewRequestDto;
import com.JJP.restapiserver.domain.dto.challenge.ReviewResponseDto;
import com.JJP.restapiserver.domain.dto.challenge.ReviewUpdateRequestDto;
import com.JJP.restapiserver.service.challenge.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
//@CrossOrigin("*")
@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping("/register")
    public ResponseEntity registerReview(@RequestBody ReviewRequestDto reviewRequestDto)
    {
        ReviewResponseDto reviewResponseDto= reviewService.registerReview(reviewRequestDto);
        if(reviewResponseDto == null){
            return new ResponseEntity("이미 등록된 한줄평이 있습니다.", HttpStatus.OK);
        }
        return new ResponseEntity(reviewService.registerReview(reviewRequestDto), HttpStatus.OK);
    }

    @GetMapping("/{challenge_id}")
    public ResponseEntity getReviewList(@PathVariable Long challenge_id)
    {
        List<ReviewResponseDto> reviewList = reviewService.getReviewList(challenge_id);
        return new ResponseEntity(reviewList, HttpStatus.OK);
    }

    @PutMapping("/{challenge_id}")
    public ResponseEntity updateReview(@RequestBody ReviewUpdateRequestDto reviewUpdateRequestDto)
    {
        return new ResponseEntity(reviewService.updateReview(reviewUpdateRequestDto), HttpStatus.OK);
    }

    @DeleteMapping("/{review_id}")
    public ResponseEntity deleteReview(@PathVariable Long review_id)
    {
        return reviewService.deleteReview(review_id);
    }
}
