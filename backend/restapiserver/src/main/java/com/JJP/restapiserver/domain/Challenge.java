package com.JJP.restapiserver.domain;

import lombok.Builder;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
public class Challenge extends BaseTimeEntity{
    @Id
    @GeneratedValue
    private Long id;

    private Long user_id;


    @Column(length = 20)
    private String name;

    @Column(length= 300)
    private String challenge_img;

    @Column(length = 500)
    private String content;

    private int level;

    @Column(length = 20)
    private String hobby;

    private int state;

    @Builder
    public Challenge(String name, String challenge_img, String content, int level
    , String hobby, int state){
        this.name = name;
        this.challenge_img = challenge_img;
        this.content = content;
        this.level = level;
        this.hobby = hobby;
        this.state = state;
    }

}
