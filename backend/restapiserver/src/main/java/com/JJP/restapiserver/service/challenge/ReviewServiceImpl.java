package com.JJP.restapiserver.service.challenge;

import com.JJP.restapiserver.domain.dto.challenge.ReviewRequestDto;
import com.JJP.restapiserver.domain.dto.challenge.ReviewResponseDto;
import com.JJP.restapiserver.domain.dto.challenge.ReviewUpdateRequestDto;
import com.JJP.restapiserver.domain.entity.challenge.Review;
import com.JJP.restapiserver.repository.challenge.ChallengeRepository;
import com.JJP.restapiserver.repository.member.MemberRepository;
import com.JJP.restapiserver.repository.challenge.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService{

    private final ReviewRepository reviewRepository;

    private final ChallengeRepository challengeRepository;

    private final MemberRepository memberRepository;

    @Override
    public ReviewResponseDto registerReview(ReviewRequestDto reviewRequestDto) {
        Optional<Review> existingReview = reviewRepository.findByMember_idAndChallenge_id(
                reviewRequestDto.getMemberId(), reviewRequestDto.getChallengeId()
        );
        if(existingReview.isPresent()){
            return null;
        }
        Review review = Review.builder()
                .review_content(reviewRequestDto.getReviewContent())
                .rate(reviewRequestDto.getRate())
                .challenge(challengeRepository.getById(reviewRequestDto.getChallengeId()))
                .member(memberRepository.getById(reviewRequestDto.getMemberId()))
                .build();
        return new ReviewResponseDto(reviewRepository.save(review));
    }

    @Override
    public List<ReviewResponseDto> getReviewList(Long challenge_id) {
        List<Review> reviewList = reviewRepository.findAllByChallenge_id(challenge_id);
        List<ReviewResponseDto> reviewResponseDtoList = new ArrayList<>();
        if(reviewList != null){
            for(int i = 0; i < reviewList.size(); i++){
                reviewResponseDtoList.add(new ReviewResponseDto(reviewList.get(i)));
            }
        }
        return reviewResponseDtoList;
    }

    @Override
    public ReviewResponseDto updateReview(ReviewUpdateRequestDto reviewUpdateRequestDto) {
        Review review = reviewRepository.getById(reviewUpdateRequestDto.getReviewId());
        review.update(reviewUpdateRequestDto);
        return new ReviewResponseDto(reviewRepository.save(review));
    }

    @Override
    public ResponseEntity deleteReview(Long review_id) {
        Review review = reviewRepository.getById(review_id);
        reviewRepository.delete(review);
        return new ResponseEntity(HttpStatus.OK);
    }
}
