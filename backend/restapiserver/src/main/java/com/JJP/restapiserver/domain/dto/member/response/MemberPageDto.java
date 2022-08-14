package com.JJP.restapiserver.domain.dto.member.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Builder
@Getter
@Setter
public class MemberPageDto {
    private List<MemberResponseDto> content;
    private int totalPages;
    private Long totalElements;
    private int pageNum;
    private int size;
}
