package com.JJP.restapiserver.domain.entity.member;

import com.JJP.restapiserver.domain.entity.BaseTimeEntity;
import lombok.Getter;

import javax.persistence.*;


// BaseTimeEntity로 알림확인일시를 잘 가공해주면 좋을 듯!
@Getter
@Entity
public class Alert extends BaseTimeEntity {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "caller_id")
    private Member caller;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "callee_id")
    private Member callee;

    private String alert_type;

    private int alert_post_id;

    @Column(length = 20)
    private String alert_message;


}
