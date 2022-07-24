package com.JJP.restapiserver.domain.entity.challenge;

import com.JJP.restapiserver.domain.entity.BaseTimeEntity;
import com.JJP.restapiserver.domain.entity.member.Member;
import com.JJP.restapiserver.domain.entity.stage.Stage;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Challenge extends BaseTimeEntity {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;


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

    @OneToMany(mappedBy = "challenge")
    private List<Stage> stages = new ArrayList<>();

    @OneToMany(mappedBy = "challenge")
    private List<ChallengeLike> challengeLikeList = new ArrayList<>();

    @OneToMany(mappedBy = "challenge")
    private List<Review> reviews = new ArrayList<>();


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
