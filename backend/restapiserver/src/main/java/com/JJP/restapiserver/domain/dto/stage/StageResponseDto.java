package com.JJP.restapiserver.domain.dto.stage;

import com.JJP.restapiserver.domain.entity.stage.Stage;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class StageResponseDto {

    private Long id;
    private Long challenge_id;
    private String name;
    private int period;
    private String content;
    private String stage_img;
    private LocalDateTime created_date;
    private LocalDateTime modified_date;
    private Long post_order;

    public StageResponseDto(Stage entity) {
        this.id = entity.getId();
        this.challenge_id = entity.getChallenge().getId();
        this.name = entity.getName();
        this.period = entity.getPeriod();
        this.content = entity.getContent();
        this.stage_img = entity.getStage_img();
        this.created_date = entity.getCreated_date();
        this.modified_date = entity.getModified_date();
        this.post_order = entity.getPost_order();
    }
}
