package com.JJP.restapiserver.domain.dto.member.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class MyPagePostDto {
    private List content;
    // 더보기만 할꺼면 없어도 됨.
    private int totalPages;
    // 총 갯수
    private Long totalElements;
    // 몇번쨰 페이지인지
    private int pageNum;
    // 페이지 하나당 데이터를 몇개씩 넣은건지
    private int size;
    private boolean hasNext;
}
