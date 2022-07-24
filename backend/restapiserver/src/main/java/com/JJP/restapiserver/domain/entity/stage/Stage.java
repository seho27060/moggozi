package com.JJP.restapiserver.domain.entity.stage;

import com.JJP.restapiserver.domain.entity.BaseTimeEntity;
import com.JJP.restapiserver.domain.entity.challenge.Challenge;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

@Getter
@Entity
public class Stage extends BaseTimeEntity {
    @Id
    @GeneratedValue
    private Long id;

    private Long post_order;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id")
    private Challenge challenge;

    @Column(length = 20)
    private String name;

    private int period;

    @Column(length = 500)
    private String content;

    @Column(length = 200)
    private String stage_img;

    @Builder

    public Stage(Long id, Long post_order, Challenge challenge, String name, int period, String content, String stage_img) {
        this.id = id;
        this.post_order = post_order;
        this.challenge = challenge;
        this.name = name;
        this.period = period;
        this.content = content;
        this.stage_img = stage_img;
    }
}
