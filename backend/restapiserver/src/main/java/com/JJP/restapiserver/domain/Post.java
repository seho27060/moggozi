package com.JJP.restapiserver.domain;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
public class Post extends BaseTimeEntity {
    @Id
    @GeneratedValue
    @Column(name = "post_id")
    private Long id;

    private Long user_id;

//    @ManyToOne(fetch = LAZY)
//    @JoinColumn(name = "member_id")
//    private Member membe2;
    @Column(length = 45)
    private String title;

    @Lob
    private String content;

    private Long stage_id;

    @Column(length = 300)
    private String post_img;

    @Builder
    public Post(Long user_id, String title, String content, Long stage_id, String post_img){
        this.user_id = user_id;
        this.title = title;
        this.content = content;
        this.stage_id = stage_id;
        this.post_img = post_img;
    }
}
