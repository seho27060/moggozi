package com.JJP.restapiserver.domain.entity.stage;

import com.JJP.restapiserver.domain.entity.BaseTimeEntity;
import com.JJP.restapiserver.domain.entity.challenge.Challenge;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Entity
@NoArgsConstructor
public class Stage extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private Long post_order;

    // 챌린지와 다대일 양방향 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id")
    @JsonBackReference
    private Challenge challenge;

    @OneToMany(mappedBy = "stage", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Post> postList = new ArrayList<>();

    @OneToMany(mappedBy = "stage", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<StageUser> stageUserList = new ArrayList<>();

    @Column(length = 20)
    private String name;

    @Column(length = 500)
    private String content;

    @Column(length = 200)
    private String stage_img;

    @Builder
    public Stage(Long id, Long post_order, Challenge challenge, String name, String content, String stage_img) {
        this.id = id;
        this.post_order = post_order;
        this.challenge = challenge;
        this.name = name;
        this.content = content;
        this.stage_img = stage_img;
    }

    public void update(String name, String content, String stage_img){
        this.name = name;
        this.content = content;
        this.stage_img = stage_img;
    }
}
