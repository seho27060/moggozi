package com.JJP.restapiserver.domain;

import lombok.Builder;
import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;

@Entity
@Getter
public class Comment extends BaseTimeEntity{
    @Id
    @GeneratedValue
    private Long id;

    private Long stage_id;

    private Long challenge_id;

    private Long user_id;

    @Lob
    private String text;

    private int parent;

    private int depth;

    private int comment_state;

    @Builder
    public Comment(Long stage_id, Long challenge_id, Long user_id, String text
    , int parent, int depth, int comment_state)
    {
        this.stage_id = stage_id;
        this.challenge_id = challenge_id;
        this.user_id = user_id;
        this.text = text;
        this.parent = parent;
        this.depth = depth;
        this.comment_state = comment_state;
    }

}
