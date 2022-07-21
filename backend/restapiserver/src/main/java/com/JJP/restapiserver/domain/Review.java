package com.JJP.restapiserver.domain;

import lombok.Builder;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
public class Review extends BaseTimeEntity{
    @Id
    @GeneratedValue
    private Long id;

    private Long challenge_id;

    private Long user_id;

    @Column(length = 20)
    private String review_content;

    // 1점부터 5점까지
    private int rate;

    @Builder
    public Review(Long challenge_id, Long user_id, String review_content,
                  int rate){
        this.challenge_id = challenge_id;
        this.user_id = user_id;
        this.review_content = review_content;
        this.rate = rate;
    }

}
