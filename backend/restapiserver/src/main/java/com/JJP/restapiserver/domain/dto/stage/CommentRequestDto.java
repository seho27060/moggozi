package com.JJP.restapiserver.domain.dto.stage;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentRequestDto {
    private Long postId;
    private String text;
    private Long parent;
    private int order;
    private int state;
}
