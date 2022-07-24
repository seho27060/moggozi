package com.JJP.restapiserver.domain.entity.member;

import com.JJP.restapiserver.domain.entity.challenge.Challenge;
import com.JJP.restapiserver.domain.entity.stage.Comment;
import com.JJP.restapiserver.domain.entity.stage.Post;
import com.JJP.restapiserver.domain.entity.challenge.Review;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

// Setter를 쓰지 말아야 할 이유
// 어디에서나 수정가능하게끔 열어놓으면 안 됨
// 수정할 일이 있을 땐 JPA 엔티티 변경 -> dirty check

@Entity
@Getter
@Setter /** 삭제 예정  */
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue
    @Column(name = "member_id")
    private Long id;

    // email을 username으로 칭한다.
    @Column(length = 30, unique= true)
    private String username;

    // 가입하는 사람의 성+이름이 합쳐진 이름이다.
    @Column(length =  20)
    private String fullname;

    // 비밀번호
    @Column(length = 100)
    private String password;

    /*

    // 가입자의 닉네임이다.
    @Column(length = 10, unique= true)
    private String nickname;

    // 한 줄 소개
    @Column(length = 100)
    private String introduce;

    // 프로필 이미지
    @Column(length = 300)
    private String user_img;

    // 마이페이지 공개 여부 - 0: false, 1: true
    private int is_private;


     */

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "member_id")
    , inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    public Member(String username, String fullname, String password) {
        this.username = username;
        this.fullname = fullname;
        this.password = password;
    }

    /*
    public Member(String username, String fullname, String password
        , String nickname, String introduce, String user_img, int is_private) {

        this.username = username;
        this.fullname = fullname;
        this.password = password;
        this.nickname = nickname;
        this.introduce = introduce;
        this.user_img = user_img;
        this.is_private = is_private;
    }

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

     */
}
