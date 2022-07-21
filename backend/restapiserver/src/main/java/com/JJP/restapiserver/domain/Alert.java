package com.JJP.restapiserver.domain;

import lombok.Generated;
import lombok.Getter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;


// BaseTimeEntity로 알림확인일시를 잘 가공해주면 좋을 듯!
@Getter
@Entity
public class Alert extends BaseTimeEntity {
    @Id
    @GeneratedValue
    private Long id;

    private Long caller_id;

    private Long callee_id;

    private String alert_type;

    private int alert_post_id;

    @Column(length = 20)
    private String alert_message;


}
