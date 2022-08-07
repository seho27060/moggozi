package com.JJP.restapiserver.domain.dto.challenge;

import com.JJP.restapiserver.domain.dto.stage.StageResponseDto;
import com.JJP.restapiserver.domain.dto.tag.TagResponseDto;
import com.JJP.restapiserver.domain.entity.challenge.Challenge;
import com.JJP.restapiserver.domain.entity.challenge.Review;
import com.JJP.restapiserver.domain.entity.stage.Stage;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ChallengeListResponseDto {
    private Long id;
    private Writer writer;
    private String name;
    private String img;
    private String content;
    private int level;
    private int likeNum;
    private List<TagResponseDto> hobbyList;
    private int userProgress;

    private String description;

    public ChallengeListResponseDto(Challenge challenge){
        this.id = challenge.getId();
        this.writer = new Writer(challenge.getMember().getId(), challenge.getMember().getNickname());
        this.name = challenge.getName();
        this.img = challenge.getChallenge_img();
        this.content = challenge.getContent();
        this.level = challenge.getLevel();
        this.likeNum = challenge.getChallengeLikeList().size();
        this.hobbyList = new ArrayList<>();
        this.userProgress = 0;
        this.description = challenge.getDescription();
    }
}
