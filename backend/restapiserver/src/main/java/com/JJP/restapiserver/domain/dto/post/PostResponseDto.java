package com.JJP.restapiserver.domain.dto.post;

import com.JJP.restapiserver.domain.dto.challenge.Writer;
import com.JJP.restapiserver.domain.entity.stage.Post;
import lombok.*;

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

    private boolean isLiked;

    private int likeNum;
    private LocalDateTime createdTime;

    private LocalDateTime modifiedTime;

    public PostResponseDto(Post post){
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.postImg = post.getPostImg();
        this.writer = new Writer(post.getMember().getId(), post.getMember().getNickname());
        this.likeNum = 0;
        this.isLiked = false;
        if(post.getPostLikeList() != null){
            this.likeNum = post.getPostLikeList().size();
        }
        this.createdTime = post.getCreatedDate();
        this.modifiedTime = post.getModifiedDate();
    }
}
