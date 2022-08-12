package com.JJP.restapiserver.domain.dto.post;

import com.JJP.restapiserver.domain.dto.challenge.Writer;
import com.JJP.restapiserver.domain.entity.file.PostImg;
import com.JJP.restapiserver.domain.entity.stage.Post;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class PostResponseDto {
    private Long id;

    private String title;

    private String content;

    private List<PostImg> postImgList;

    private Writer writer;

    private boolean isLiked;

    private int likeNum;
    private LocalDateTime createdTime;

    private LocalDateTime modifiedTime;

    public PostResponseDto(Post post){
        this.id = post.getId();
        this.title = post.getTitle();
        this.content = post.getContent();
        this.postImgList = post.getPostImgList();
        this.writer = new Writer(post.getMember().getId(), post.getMember().getNickname(), post.getMember().getUser_img());
        this.likeNum = 0;
        this.isLiked = false;
        if(post.getPostLikeList() != null){
            this.likeNum = post.getPostLikeList().size();
        }
        this.createdTime = post.getCreatedDate();
        this.modifiedTime = post.getModifiedDate();
    }
}
