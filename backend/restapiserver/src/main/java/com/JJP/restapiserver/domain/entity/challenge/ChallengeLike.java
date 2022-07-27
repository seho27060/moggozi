package com.JJP.restapiserver.domain.entity.challenge;

import com.JJP.restapiserver.domain.entity.member.Member;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

// 완전 복합키로 가져야 하지 않나?
@Entity
@Getter
@Builder
public class ChallengeLike {
    @Id
    @GeneratedValue
    private Long id;

    // 멤버와 다대일 양방향 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @JsonBackReference
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="challenge_id")
    @JsonBackReference
    private Challenge challenge;
}
