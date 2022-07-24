package com.JJP.restapiserver.domain.entity.member;

import com.JJP.restapiserver.domain.entity.member.Role;
import lombok.*;

import javax.persistence.*;

// 사용자들의 권한 설정
@Entity
@Getter
@Setter /** 삭제 예정  */
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Authority {

    @Id
    @Column(name = "authority_id")
    @GeneratedValue
    private int id;

    // 0: valid user, 1: invalid user, 2: admin
    @Enumerated(EnumType.ORDINAL)
    private Role role;
}
