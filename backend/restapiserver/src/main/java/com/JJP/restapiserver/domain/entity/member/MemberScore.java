package com.JJP.restapiserver.domain.entity.member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberScore {

    @Id
    @Column(name = "member_id", nullable = false)
    private Long id;

    private Long score;

    // 스테이지 완료시 score  + 1;
    public void addScore(Long score){
        this.score += score;
    }
}