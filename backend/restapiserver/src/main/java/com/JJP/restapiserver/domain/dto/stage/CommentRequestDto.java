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
    Long stage_id;
    String text;
    Long parent;
    int depth;
    int comment_state;

}
