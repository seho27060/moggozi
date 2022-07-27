package com.JJP.restapiserver.domain.entity.challenge;

import com.JJP.restapiserver.domain.entity.member.Member;
import lombok.Getter;

import javax.persistence.*;

// 완전 복합키로 가져야 하지 않나?
@Entity
@Getter
public class ChallengeLike {
    @Id
    @GeneratedValue
    private Long id;


    // 멤버와 다대일 양방향 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="challenge_id")
    private Challenge challenge;
}
