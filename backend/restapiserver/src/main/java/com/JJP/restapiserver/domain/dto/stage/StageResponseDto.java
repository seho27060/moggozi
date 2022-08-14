package com.JJP.restapiserver.domain.dto.stage;

import com.JJP.restapiserver.domain.entity.file.StageImg;
import com.JJP.restapiserver.domain.entity.stage.Stage;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class StageResponseDto {

    private Long id;
    private Long challengeId;
    private String name;
    private String content;

    private List<StageImg> stageImgList;
    private LocalDateTime createdDate;
    private LocalDateTime modifiedDate;
    private Long order;

    public StageResponseDto(Stage entity) {
        this.id = entity.getId();
        this.challengeId = entity.getChallenge().getId();
        this.name = entity.getName();
        this.content = entity.getContent();
        this.stageImgList = entity.getStageImgList();
        this.createdDate = entity.getCreatedDate();
        this.modifiedDate = entity.getModifiedDate();
        this.order = entity.getStage_order();
    }
}
