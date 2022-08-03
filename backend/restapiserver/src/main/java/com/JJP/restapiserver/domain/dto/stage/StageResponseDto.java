package com.JJP.restapiserver.domain.dto.stage;

import com.JJP.restapiserver.domain.entity.stage.Stage;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class StageResponseDto {

    private Long id;
    private Long challengeId;
    private String name;
    private int period;
    private String content;
    private String stageImg;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private Long postOrder;

    public StageResponseDto(Stage entity) {
        this.id = entity.getId();
        this.challengeId = entity.getChallenge().getId();
        this.name = entity.getName();
        this.period = entity.getPeriod();
        this.content = entity.getContent();
        this.stageImg = entity.getStage_img();
        this.createdDate = entity.getCreated_date();
        this.modifiedDate = entity.getModified_date();
        this.postOrder = entity.getPost_order();
    }
}
