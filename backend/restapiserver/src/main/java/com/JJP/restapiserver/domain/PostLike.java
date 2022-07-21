package com.JJP.restapiserver.domain;

import lombok.Builder;
import lombok.Getter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
public class PostLike {
    @Id
    @GeneratedValue
    private Long id;

    private Long post_id;

    //post 작성자 번호 <- 있어야 함?
    private Long user_id;

    // 좋아요 누른 사용자 번호
    private Long user_id2;

    @Builder
    public PostLike(Long post_id, Long user_id, Long user_id2){
        this.post_id = post_id;
        this.user_id= user_id;
        this.user_id2 = user_id2;
    }
}
