package com.JJP.restapiserver.domain.dto.stage;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StageUpdateRequestDto {
    private String name;
    private String content;
    private String img;

    @Builder
    public StageUpdateRequestDto(String name, String content, String img){
        this.name = name;
        this.content = content;
        this.img = img;
    }
}
