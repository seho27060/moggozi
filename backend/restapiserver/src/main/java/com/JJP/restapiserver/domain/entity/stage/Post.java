package com.JJP.restapiserver.domain.entity.stage;

import com.JJP.restapiserver.domain.entity.BaseTimeEntity;
import com.JJP.restapiserver.domain.entity.member.Member;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class Post extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "post_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @JsonBackReference
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stage_id")
    @JsonBackReference
    private Stage stage;

    @Column(length = 45)
    private String title;

    @Lob
    private String content;

    @Column(length = 300)
    private String postImg;


    // 포스트 좋아요와 다대일 양방향 관계
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<PostLike> postLikeList = new ArrayList<>();

    @Builder
    public Post(Long id, Member member, Stage stage, String title, String content, String post_img) {
        this.id = id;
        this.member = member;
        this.stage = stage;
        this.title = title;
        this.content = content;
        this.postImg = post_img;
    }

    public void update(String title, String content, String post_img) {
        this.title = title;
        this.content = content;
        this.postImg = post_img;
    }
}
