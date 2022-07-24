package com.JJP.restapiserver.domain.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter /** 삭제 예정  */
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Users {

    // Column 설정
    @JsonIgnore
    @Id
    @Column(name = "user_id")
    @GeneratedValue
    private Long id;

    @Email
    @Column(name = "email", length = 30, unique = true)
    private String email;

    @NotNull
    @Column(name = "username", length = 20)
    private String username;

    @Column(name = "nickname", length = 10, unique = true)
    private String nickname;

    @NotNull
    @Column(name = "password", length = 100)
    private String password;

    @Column(name = "introduce", length = 100)
    private String introduce;

    @Column(name = "user_img", length = 300)
    private String user_img;

    @Column(name = "is_private", length = 1) // 0: false, 1: true
    private int is_private;

    @JsonIgnore
    @Column(name = "user_state", length = 1)
    private int user_state;

    // 타 테이블(개체)와의 관계 설정
}
