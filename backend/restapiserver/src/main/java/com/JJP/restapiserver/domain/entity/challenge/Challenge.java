package com.JJP.restapiserver.domain.entity.challenge;

import com.JJP.restapiserver.domain.entity.BaseTimeEntity;
import com.JJP.restapiserver.domain.entity.member.Member;
import com.JJP.restapiserver.domain.entity.stage.Stage;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
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


    // 스테이지와 다대일 양방향 관계
    @OneToMany(mappedBy = "challenge")
    private List<Stage> stages = new ArrayList<>();

    // 좋아요와 다대일 단방향 관계
    @OneToMany
    private List<ChallengeLike> challengeLikeList = new ArrayList<>();

    // 한줄평과 일대다 단방향 관계
    @OneToMany
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "challenge")
    private List<JoinedChallenge> joinedChallengeList = new ArrayList<>();


    @Builder
    public Challenge(Long id, Member member, String name, String challenge_img, String content, int level, String hobby, int state) {
        this.id = id;
        this.member = member;
        this.name = name;
        this.challenge_img = challenge_img;
        this.content = content;
        this.level = level;
        this.hobby = hobby;
        this.state = state;
    }
}
