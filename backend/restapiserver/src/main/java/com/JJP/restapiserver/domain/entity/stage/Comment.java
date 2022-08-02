package com.JJP.restapiserver.domain.entity.stage;

import com.JJP.restapiserver.domain.dto.stage.CommentRequestDto;
import com.JJP.restapiserver.domain.entity.BaseTimeEntity;
import com.JJP.restapiserver.domain.entity.member.Member;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;



@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Comment extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="stage_id")
    @JsonBackReference
    private Stage stage;

    // 멤버와 다대일 양방향 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private Member member;

    @Lob
    private String text;

    private Long parent;

    private int depth;

    private int comment_state;

    public void update(CommentRequestDto commentRequestDto)
    {
        this.text = commentRequestDto.getText();
        this.parent = commentRequestDto.getParent();
        this.depth = commentRequestDto.getDepth();
        this.comment_state = commentRequestDto.getCommentState();
    }
}
