package com.JJP.restapiserver.domain.dto.post;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostUpdateRequestDto {
    private Long postId;
    private String title;
    private String content;
    private String postImg;

    @Builder
    public PostUpdateRequestDto(Long postId, String title, String content, String postImg){
        this.postId = postId;
        this.title = title;
        this.content = content;
        this.postImg = postImg;
    }
}
