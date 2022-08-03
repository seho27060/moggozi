package com.JJP.restapiserver.domain.entity.member;

import lombok.*;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RefreshToken {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;


    /**
     * 사용자에서 리프레시 토큰에 접근할 할 경우는 거의 없다.
     * 리프레시 토큰에서 사용자가 누구인지를 접근할 경우가 많기에 단방향 관계 설정으로 충분하다.
     * referencedColumnName은 실제로 Member 에서 참조하는 Column 명
     */
    @OneToOne
    @JoinColumn(name = "member_id", referencedColumnName = "member_id")
    private Member member;


    @Column(nullable = false, unique = true)
    private String token;

    @Column(nullable = false)
    private Instant expiryDate;

}
