package com.JJP.restapiserver.domain.entity.member;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberScore {

    @Id
    @Column(name = "member_id", nullable = false)
    private Long id;

//    @OneToOne(cascade = {CascadeType.PERSIST ,CascadeType.MERGE})
    @OneToOne(cascade = {CascadeType.PERSIST ,CascadeType.MERGE})
    @MapsId //@MapsId 는 @id로 지정한 컬럼에 @OneToOne 이나 @ManyToOne 관계를 매핑시키는 역할
    @JoinColumn(name = "member_id")
    private Member member;

    @Column(nullable = false)
    @ColumnDefault("0")
    private Long score;

    // 스테이지 완료시 score  + 1;
    public void addScore(Long score){
        this.score += score;
    }
}