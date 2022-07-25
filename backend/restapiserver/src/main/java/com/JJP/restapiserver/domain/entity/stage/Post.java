package com.JJP.restapiserver.domain.entity.stage;

import com.JJP.restapiserver.domain.entity.BaseTimeEntity;
import com.JJP.restapiserver.domain.entity.member.Member;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Post extends BaseTimeEntity {
    @Id
    @GeneratedValue
    @Column(name = "post_id")
    private Long id;

    @JoinColumn(name = "member_id")
    @ManyToOne
    private Member member;
    @Column(length = 45)
    private String title;

    @Lob
    private String content;

    private Long stage_id;

    @Column(length = 300)
    private String post_img;


    // 포스트 좋아요와 다대일 양방향 관계
    @OneToMany(mappedBy = "post")
    private List<PostLike> postLikeList = new ArrayList<>();

    @Builder
    public Post(Long id, Member member, String title, String content, Long stage_id, String post_img) {
        this.id = id;
        this.member = member;
        this.title = title;
        this.content = content;
        this.stage_id = stage_id;
        this.post_img = post_img;
    }
}
