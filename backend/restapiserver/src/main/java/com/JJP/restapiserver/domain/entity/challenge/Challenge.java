package com.JJP.restapiserver.domain.entity.challenge;

import com.JJP.restapiserver.domain.dto.challenge.ChallengeRequestDto;
import com.JJP.restapiserver.domain.entity.BaseTimeEntity;
import com.JJP.restapiserver.domain.entity.Tag.ChallengeTag;
import com.JJP.restapiserver.domain.entity.member.Member;
import com.JJP.restapiserver.domain.entity.stage.Stage;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
public class Challenge extends BaseTimeEntity {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @JsonBackReference
    private Member member;

    private String name;

    @Column(length= 300)
    private String challenge_img;

    @Column(length = 500)
    private String content;

    private int level;

    private int state;

    @Column(columnDefinition = "INTEGER default 0")
    private int likeNum = 0;
    private String description;

    // 스테이지와 다대일 양방향 관계
    @OneToMany(mappedBy = "challenge", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Stage> stageList = new ArrayList<>();

    // 좋아요와 다대일 단방향 관계
    @OneToMany(mappedBy = "challenge", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<ChallengeLike> challengeLikeList = new ArrayList<>();

    // 한줄평과 일대다 단방향 관계
    @OneToMany(mappedBy = "challenge", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Review> reviewList = new ArrayList<>();

    @OneToMany(mappedBy = "challenge" , cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<JoinedChallenge> joinedChallengeList = new ArrayList<>();

    @OneToMany(mappedBy = "challenge", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<ChallengeTag> challengeTagList = new ArrayList<>();

    public void imgUpdate(String path){
        this.challenge_img = path;
    }

    public void updateChallenge(ChallengeRequestDto challengeRequestDto)
    {
        this.name = challengeRequestDto.getName();
//        this.challenge_img = challengeRequestDto.getImg();
        this.content = challengeRequestDto.getContent();
        this.level = challengeRequestDto.getLevel();
//        this.hobby = challengeRequestDto.getHobby();
        this.description = challengeRequestDto.getDescription();
    }
    public void setZeroLikeNum(){
        this.likeNum = 0;
    }

    public void addLikeNum(){
        this.likeNum++;
    }

    public void register(){
        this.state = 1;
    }
//    @Builder
//    public Challenge(Long id, Member member, String name, String challenge_img, String content, int level, String hobby, int state) {
//        this.id = id;
//        this.member = member;
//        this.name = name;
//        this.challenge_img = challenge_img;
//        this.content = content;
//        this.level = level;
//        this.hobby = hobby;
//        this.state = state;
//    }
}
