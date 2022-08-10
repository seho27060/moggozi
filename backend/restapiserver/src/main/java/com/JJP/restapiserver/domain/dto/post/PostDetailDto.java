package com.JJP.restapiserver.domain.dto.post;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
public class PostDetailDto {
    private Long id;

    private String title;

    private String content;

    private String postImg;

    private Long writer;

    private boolean isLiked;

    private int likeNum;
    private LocalDateTime createdTime;

    private LocalDateTime modifiedTime;
}
