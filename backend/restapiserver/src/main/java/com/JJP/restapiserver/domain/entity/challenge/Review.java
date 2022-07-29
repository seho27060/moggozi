package com.JJP.restapiserver.domain.entity.challenge;

import com.JJP.restapiserver.domain.dto.challenge.ReviewUpdateRequestDto;
import com.JJP.restapiserver.domain.entity.BaseTimeEntity;
import com.JJP.restapiserver.domain.entity.member.Member;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@AllArgsConstructor
@Builder
public class Review extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Column(length = 20)
    private String review_content;

    // 1점부터 5점까지
    private int rate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id")
    @JsonBackReference
    private Challenge challenge;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private Member member;

    public void update(ReviewUpdateRequestDto reviewUpdateRequestDto) {
        this.review_content = reviewUpdateRequestDto.getReview_content();
        this.rate = reviewUpdateRequestDto.getRate();
    }

    public Review() {

    }
}
