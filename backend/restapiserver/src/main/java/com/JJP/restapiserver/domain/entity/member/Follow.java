package com.JJP.restapiserver.domain.entity.member;

import com.JJP.restapiserver.domain.entity.BaseTimeEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
//@Table(
//        uniqueConstraints = {
//                @UniqueConstraint(
//                        name="subscribe_uk",
//                        columnNames = {"from_member_id", "to_member_id"}
//                )
//        }
//)
public class Follow extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    /**
     * from_member가 to_member를 follow 한다. (following)
     * to_member가 from_member를 follow 한다. (follwed)
     */



    // 멤버와 다대일 양방향 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_member_id")
    @JsonBackReference
    private Member from_member;

    // 멤버와 다대일 양방향 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_member_id")
    @JsonBackReference
    private Member to_member;

    @Builder
    public Follow(Member from_member, Member to_member) {
        this.from_member = from_member;
        this.to_member = to_member;
    }

}
