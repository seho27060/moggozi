package com.JJP.restapiserver.domain.dto.challenge;

import com.JJP.restapiserver.domain.dto.tag.TagResponseDto;
import com.JJP.restapiserver.domain.entity.Tag.Tag;
import com.JJP.restapiserver.domain.entity.challenge.Challenge;
import com.JJP.restapiserver.domain.entity.challenge.Review;
import com.JJP.restapiserver.domain.entity.member.Member;
import com.JJP.restapiserver.domain.entity.stage.Stage;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ChallengeResponseDto {
    private Long challenge_id;
    private Writer writer;
    private String name;
    private String challenge_img;
    private String content;
    private int level;
    private List<Stage> stageList;
    private int like_num;
    private List<Review> reviewList;
    private List<TagResponseDto> tagList;
    private int user_progress;

    public ChallengeResponseDto(Challenge challenge){
        this.challenge_id = challenge.getId();
        this.writer = new Writer(challenge.getMember().getId(), challenge.getMember().getFullname());
        this.name = challenge.getName();
        this.challenge_img = challenge.getChallenge_img();
        this.content = challenge.getContent();
        this.level = challenge.getLevel();
        this.stageList = challenge.getStageList();
        this.like_num = challenge.getChallengeLikeList().size();
        this.reviewList = challenge.getReviewList();
        this.tagList = new ArrayList<>();
        this.user_progress = 0;
    }
}
