package com.JJP.restapiserver.service.challenge;

import com.JJP.restapiserver.domain.dto.ReviewRequestDto;
import com.JJP.restapiserver.domain.dto.ReviewUpdateRequestDto;
import com.JJP.restapiserver.domain.entity.challenge.Review;
import com.JJP.restapiserver.repository.challenge.ChallengeRepository;
import com.JJP.restapiserver.repository.member.MemberRepository;
import com.JJP.restapiserver.repository.challenge.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService{

    private final ReviewRepository reviewRepository;

    private final ChallengeRepository challengeRepository;

    private final MemberRepository memberRepository;

    @Override
    public ResponseEntity registerReview(ReviewRequestDto reviewRequestDto) {
        Review review = Review.builder()
                .review_content(reviewRequestDto.getReview_content())
                .rate(reviewRequestDto.getRate())
                .challenge(challengeRepository.getById(reviewRequestDto.getChallenge_id()))
                .member(memberRepository.getById(reviewRequestDto.getUser_id()))
                .build();
        reviewRepository.save(review);
        return new ResponseEntity(HttpStatus.OK);
    }

    @Override
    public List<Review> getReviewList(Long challenge_id) {
        List<Review> reviewList = reviewRepository.findAllByChallenge_id(challenge_id);
        return reviewList;
    }

    @Override
    public ResponseEntity updateReview(ReviewUpdateRequestDto reviewUpdateRequestDto) {
        Review review = reviewRepository.getById(reviewUpdateRequestDto.getReview_id());
        review.update(reviewUpdateRequestDto);
        reviewRepository.save(review);
        return new ResponseEntity(HttpStatus.OK);
    }

    @Override
    public ResponseEntity deleteReview(Long review_id) {
        Review review = reviewRepository.getById(review_id);
        reviewRepository.delete(review);
        return new ResponseEntity(HttpStatus.OK);
    }
}
