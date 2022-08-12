package com.JJP.restapiserver.domain.dto.post;

import com.JJP.restapiserver.domain.entity.member.Member;
import com.JJP.restapiserver.domain.entity.stage.Post;
import com.JJP.restapiserver.domain.entity.stage.Stage;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PostSaveRequestDto {
    private Long stageId;
    private String title;
    private String content;
    private String postImg;

    @Builder
    public PostSaveRequestDto(Long stageId, String title, String content, String postImg) {
        this.stageId = stageId;
        this.title = title;
        this.content = content;
        this.postImg = postImg;
    }

    public Post toEntity(Member member, Stage stage){
        return Post.builder()
                .member(member)
                .stage(stage)
                .title(title)
                .content(content)
                .post_img(postImg)
                .build();
    }
}
