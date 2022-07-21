package com.JJP.restapiserver.domain;

import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Member {
    @Id
    @GeneratedValue
    @Column(name = "member_id")
    private Long id;

    @Column(length = 50)
    private String email;
    @Column(length =  20)
    private String username;

    @Column(length = 20)
    private String nickname;

    @Column(length = 40)
    private String introduce;
    @Column(length = 20)
    private String password;

    @Column(length = 300)
    private String user_img;

    private int user_state;


    @OneToMany
    private List<Post> posts = new ArrayList<>();

    @Builder
    public Member(String email, String username, String nickname, String introduce, String password
    , String user_img, int user_state)
    {
        this.email = email;
        this.username = username;
        this.nickname = nickname;
        this.introduce = introduce;
        this.password = password;
        this.user_img = user_img;
        this.user_state = user_state;
    }

}
