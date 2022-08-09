package com.JJP.restapiserver.domain.dto.challenge;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class ChallengePageDto {
    private List<ChallengeListResponseDto> content;
    private int totalPages;
    private Long totalElements;
    private int pageNum;
    private int size;
}
