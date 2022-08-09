package com.JJP.restapiserver.domain.dto.stage;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class MyStageDto {
    private Long id;
    private String img;
    private String name;
    private int state;
}
