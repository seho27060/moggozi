package com.JJP.restapiserver.domain.entity.stage;

import com.JJP.restapiserver.domain.entity.member.Member;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class PostLike {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;


    // 좋아요 누른 사용자 번호
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder

    public PostLike(Long id, Post post, Member member) {
        this.id = id;
        this.post = post;
        this.member = member;
    }
}
