package com.JJP.restapiserver.domain.entity.member;

import com.JJP.restapiserver.domain.entity.challenge.Challenge;
import com.JJP.restapiserver.domain.entity.stage.Comment;
import com.JJP.restapiserver.domain.entity.stage.Post;
import com.JJP.restapiserver.domain.entity.challenge.Review;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

// Setter를 쓰지 말아야 할 이유
// 어디에서나 수정가능하게끔 열어놓으면 안 됨
// 수정할 일이 있을 땐 JPA 엔티티 변경 -> dirty check

@Entity
@Getter
public class Member {
    @Id
    @GeneratedValue
    @Column(name = "member_id")
    private Long id;

    @Column(length = 30)
    private String email;
    @Column(length =  20)
    private String username;

    @Column(length = 10)
    private String nickname;

    @Column(length = 50)
    private String introduce;
    @Column(length = 20)
    private String password;

    @Column(length = 300)
    private String user_img;

    private int user_state;


    @OneToMany(mappedBy = "member")
    private List<Challenge> challengeList = new ArrayList<>();
    // mappedBy 는 연관관계의 주인이 나를 어떤 식별자 명으로 부르고 있는지를 넣어줘야 함.
    @OneToMany(mappedBy = "writer")
    private List<Post> posts = new ArrayList<>();

    @OneToMany(mappedBy = "caller")
    private List<Alert> caller_alerts = new ArrayList<>();

    @OneToMany(mappedBy = "callee")
    private List<Alert> callee_alerts = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "from_user_id")
    private List<Follow> follower_list = new ArrayList<>();

    @OneToMany(mappedBy = "to_user_id")
    private List<Follow> following_list = new ArrayList<>();

//    @OneToMany(mappedBy = "member")
//    private List<ChallengeLike> challengeLikeList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Review> reviews = new ArrayList<>();

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
