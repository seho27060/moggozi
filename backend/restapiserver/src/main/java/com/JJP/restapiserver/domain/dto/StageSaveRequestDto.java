package com.JJP.restapiserver.domain.dto;

import com.JJP.restapiserver.domain.entity.stage.Stage;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StageSaveRequestDto {
    private String name;
    private int period;
    private String content;
    private String stage_img;
    private Long order;

    @Builder
    public StageSaveRequestDto(String name, int period, String content, String stage_img, Long order){
        this.name = name;
        this.period = period;
        this.content = content;
        this.stage_img = stage_img;
        this.order = order;
    }

    public Stage toEntity(){
        return Stage.builder()
                .name(name)
                .period(period)
                .content(content)
                .stage_img(stage_img)
                .post_order(order)
                .build();
    }
}
