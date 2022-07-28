package com.JJP.restapiserver.domain.entity.hobby;


import com.JJP.restapiserver.domain.entity.member.Member;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberTag {
    @Id
    @GeneratedValue
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
