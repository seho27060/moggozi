package com.JJP.restapiserver.domain.entity.member;

import lombok.*;

import javax.persistence.*;

// 사용자들의 권한 설정
@Entity
@Getter
@NoArgsConstructor
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    private ERole name; // 권한 이름

    public Role(ERole name) {
        this.name = name;
    }
}
