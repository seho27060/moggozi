package com.JJP.restapiserver.domain.entity.Tag;


import com.JJP.restapiserver.domain.entity.BaseTimeEntity;
import com.JJP.restapiserver.domain.entity.member.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberTag extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
//    @JsonBackReference
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
//    @JsonBackReference
    @JoinColumn(name = "tag_id")
    private Tag tag;
}
