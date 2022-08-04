package com.JJP.restapiserver.domain.dto.stage;

import com.JJP.restapiserver.domain.dto.challenge.Writer;
import com.JJP.restapiserver.domain.entity.stage.Comment;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentResponseDto {
    private Long id;

    private Writer writer;

    private String text;

    private Long parentId;

    private int order;

    private int state;

    private LocalDateTime createdTime;

    private LocalDateTime modifiedTime;

    public CommentResponseDto(Comment comment){
        this.id = comment.getId();
        this.writer = new Writer(comment.getMember().getId(),
                comment.getMember().getNickname());
        this.parentId = comment.getParent();
        this.text = comment.getText();
        this.order = comment.getCommentOrder();
        this.state = comment.getState();
        this.createdTime = comment.getCreatedDate();
        this.modifiedTime = comment.getModifiedDate();
    }
}
