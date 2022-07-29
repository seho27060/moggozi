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
    private Long member_id;
    private Long stage_id;
    private String title;
    private String content;
    private String post_img;

    @Builder
    public PostSaveRequestDto(Long member_id, Long stage_id, String title, String content, String post_img) {
        this.member_id = member_id;
        this.stage_id = stage_id;
        this.title = title;
        this.content = content;
        this.post_img = post_img;
    }

    public Post toEntity(Member member, Stage stage){
        return Post.builder()
                .member(member)
                .stage(stage)
                .title(title)
                .content(content)
                .post_img(post_img)
                .build();
    }
}
