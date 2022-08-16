package com.JJP.restapiserver.domain.entity.stage;

import com.JJP.restapiserver.domain.entity.BaseTimeEntity;
import com.JJP.restapiserver.domain.entity.challenge.Challenge;
import com.JJP.restapiserver.domain.entity.file.StageImg;
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

    private Long stage_order;

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

    @OneToMany(mappedBy = "stage", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<StageImg> stageImgList = new ArrayList<>();

    private String name;

    @Lob
    private String content;

    private String img;

    @Builder
    public Stage(Long id, Long order, Challenge challenge, String name, String content, String img) {
        this.id = id;
        this.stage_order = order;
        this.challenge = challenge;
        this.name = name;
        this.content = content;
        this.img = img;
    }

    public void update(String name, String content, String img){
        this.name = name;
        this.content = content;
        this.img = img;
    }

    public void update(Long stage_order){
        this.stage_order = stage_order;
    }
}
