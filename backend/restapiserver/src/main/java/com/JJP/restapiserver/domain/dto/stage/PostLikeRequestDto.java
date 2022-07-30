package com.JJP.restapiserver.domain.dto.stage;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PostLikeRequestDto {
    private Long post_id;
    private Long member_id;
}
