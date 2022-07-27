package com.JJP.restapiserver.domain.entity.challenge;

import com.JJP.restapiserver.domain.entity.BaseTimeEntity;
import com.JJP.restapiserver.domain.entity.member.Member;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Review extends BaseTimeEntity {
    @Id
    @GeneratedValue
    private Long id;

    @Column(length = 20)
    private String review_content;

    // 1점부터 5점까지
    private int rate;

//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "challenge_id")
//    private Challenge challenge;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private Member member;

    @Builder
    public Review(Long id, String review_content, int rate, Member member) {
        this.id = id;
        this.review_content = review_content;
        this.rate = rate;
        this.member = member;
    }

    public Review() {

    }
}
