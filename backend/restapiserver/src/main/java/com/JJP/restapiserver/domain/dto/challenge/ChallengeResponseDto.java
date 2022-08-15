package com.JJP.restapiserver.domain.dto.challenge;

import com.JJP.restapiserver.domain.dto.stage.StageResponseDto;
import com.JJP.restapiserver.domain.dto.tag.TagResponseDto;
import com.JJP.restapiserver.domain.entity.Tag.Tag;
import com.JJP.restapiserver.domain.entity.challenge.Challenge;
import com.JJP.restapiserver.domain.entity.challenge.Review;
import com.JJP.restapiserver.domain.entity.member.Member;
import com.JJP.restapiserver.domain.entity.stage.Stage;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Getter
@Setter
public class ChallengeResponseDto {
    private Long id;
    private Writer writer;
    private String name;
    private String img;
    private String content;
    private int level;
    private List<StageResponseDto> stageList;
    private int likeNum;
    private List<ReviewResponseDto> reviewList;
    private List<TagResponseDto> hobbyList;
    private int userProgress;

    private int state;

    private LocalDateTime createdTime;

    private LocalDateTime modifiedTime;

    private String description;

    private boolean isLiked;

    public ChallengeResponseDto(Challenge challenge){
        this.id = challenge.getId();
        this.writer = new Writer(challenge.getMember().getId(), challenge.getMember().getNickname(), challenge.getMember().getUser_img(), challenge.getMember().getMemberScore().getScore());
        this.name = challenge.getName();
        this.img = challenge.getChallenge_img();
        this.content = challenge.getContent();
        this.level = challenge.getLevel();
        this.state = challenge.getState();
        this.stageList = new ArrayList<>();
        if(challenge.getStageList() != null)
            for(int i = 0; i < challenge.getStageList().size(); i++){
                Stage stage = challenge.getStageList().get(i);
                StageResponseDto stageResponseDto = new StageResponseDto(stage);
                this.stageList.add(stageResponseDto);
            }
        Collections.sort(this.stageList, new Comparator<StageResponseDto>() {
            @Override
            public int compare(StageResponseDto o1, StageResponseDto o2) {
                if(o1.getOrder() < o2.getOrder())
                    return -1;
                else
                    return 1;
            }
        });
        this.likeNum = challenge.getLikeNum();
        this.reviewList = new ArrayList<>();
        if(challenge.getReviewList() != null)
            for(int i = 0; i < challenge.getReviewList().size(); i++){
                Review review = challenge.getReviewList().get(i);
                ReviewResponseDto reviewResponseDto = new ReviewResponseDto(review);
                this.reviewList.add(reviewResponseDto);
            }
        this.hobbyList = new ArrayList<>();
        this.userProgress = 0;
        this.description = challenge.getDescription();
        this.createdTime = challenge.getCreatedDate();
        this.modifiedTime = challenge.getModifiedDate();
        this.isLiked = false;
    }
}
