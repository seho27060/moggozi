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
    @JoinColumn(name="post_id")
    @JsonBackReference
    private Post post;

    // 멤버와 다대일 양방향 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @JsonBackReference
    private Member member;

    @Lob
    private String text;

    private Long parent;

    private int order;

    private int state;

    public void update(CommentRequestDto commentRequestDto)
    {
        this.text = commentRequestDto.getText();
        this.state = commentRequestDto.getState();
    }
}
