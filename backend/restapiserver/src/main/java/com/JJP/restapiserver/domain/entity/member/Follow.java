package com.JJP.restapiserver.domain.entity.member;

import com.JJP.restapiserver.domain.entity.BaseTimeEntity;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Follow extends BaseTimeEntity {

    @Id
    @GeneratedValue
    private Long id;

    // 멤버와 다대일 양방향 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_user_id")
    private Member from_user_id;

    // 멤버와 다대일 양방향 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_user_id")
    private Member to_user_id;

}
