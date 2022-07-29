package com.JJP.restapiserver.domain.dto.post;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostUpdateRequestDto {
    private Long post_id;
    private String title;
    private String content;
    private String post_img;

    @Builder
    public PostUpdateRequestDto(Long post_id, String title, String content, String post_img){
        this.post_id = post_id;
        this.title = title;
        this.content = content;
        this.post_img = post_img;
    }
}
