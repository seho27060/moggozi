package com.JJP.restapiserver.domain.dto.tag;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
public class TagResponseDto {
    private Long id;
    private String hobby;
}
