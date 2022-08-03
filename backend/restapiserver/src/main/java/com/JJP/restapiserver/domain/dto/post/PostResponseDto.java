package com.JJP.restapiserver.domain.dto.post;

import com.JJP.restapiserver.domain.dto.challenge.Writer;
import com.JJP.restapiserver.domain.entity.stage.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class PostResponseDto {
    private Long id;

    private String title;

    private String content;

    private String postImg;

    private Writer writer;

    private LocalDateTime createdTime;

    private LocalDateTime modifiedTime;

    public PostResponseDto(Post post){
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.postImg = post.getPostImg();
        this.writer = new Writer(post.getMember().getId(), post.getMember().getNickname());
        this.createdTime = post.getCreated_date();
        this.modifiedTime = post.getModified_date();
    }
}
