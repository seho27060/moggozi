package com.JJP.restapiserver.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CommentRequestDto {
    Long stage_id;
    Long user_id;
    String text;
    Long parent;
    int depth;
    int comment_state;

}
