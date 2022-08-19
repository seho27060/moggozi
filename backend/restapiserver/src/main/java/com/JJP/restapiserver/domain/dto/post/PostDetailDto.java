package com.JJP.restapiserver.domain.dto.post;

import com.JJP.restapiserver.domain.dto.challenge.Writer;
import com.JJP.restapiserver.domain.entity.file.PostImg;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostDetailDto {
    private Long id;

    private String title;

    private String content;

    private List<PostImg> postImg;

    private Writer writer;

    private boolean isLiked;

    private int likeNum;
    private LocalDateTime createdTime;

    private LocalDateTime modifiedTime;
}
