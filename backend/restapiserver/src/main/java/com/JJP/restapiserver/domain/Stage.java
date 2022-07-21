package com.JJP.restapiserver.domain;

import lombok.Builder;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Getter
@Entity
public class Stage extends BaseTimeEntity{
    @Id
    @GeneratedValue
    private Long id;

    private Long post_order;

    private Long challenge_id;

    @Column(length = 20)
    private String name;

    private int period;

    @Column(length = 500)
    private String content;

    @Column(length = 200)
    private String stage_img;

    @Builder
    public Stage(Long challenge_id, Long post_order, String name, int period, String content
            , String stage_img){
        this.post_order = post_order;
        this.challenge_id = challenge_id;
        this.name = name;
        this.period = period;
        this.content = content;
        this.stage_img = stage_img;
    }
}
