package com.JJP.restapiserver.domain.entity.member;

import com.JJP.restapiserver.domain.entity.stage.Comment;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

// Setter를 쓰지 말아야 할 이유
// 어디에서나 수정가능하게끔 열어놓으면 안 됨
// 수정할 일이 있을 땐 JPA 엔티티 변경 -> dirty check

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue
    @Column(name = "member_id")
    private Long id;

    // username은 email이다.
    @Column(nullable = false, length = 30, unique= true)
    private String username; // 사용자의 아이디: email

    // 가입하는 사람의 성+이름이 합쳐진 이름이다.
    @Column(nullable = false, length =  20)
    private String fullname; // 사용자의 이름: last name + first name

    // 비밀번호
    @Column(nullable = false, length = 100)
    private String password; // BCrypt에 의해 Encoding되어 저장된다.

    // 가입자의 닉네임
    @Column(nullable = false, length = 10, unique= true)
    private String nickname;

    // 한 줄 소개
    @Column(length = 100)
    private String introduce;

    // 프로필 이미지
    @Column(length = 300) /** 크기 변경 예정 **/
    private String user_img;

    // 마이페이지 공개 여부 - 0: false, 1: true
    private int is_private;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id")
    private Role role;

    // 생성자
    @OneToMany(mappedBy = "member")
    @JsonManagedReference
    private List<Comment> commentList = new ArrayList<>();

    /** 삭제 예정 */
    public Member(String username, String nickname, String password, Role role) {
        this.username = username;
        this.fullname = nickname;
        this.password = password;
    }

    @Builder
    public Member(String username, String fullname, String password, String nickname, String introduce, String user_img, int is_private, Role role) {
        this.username = username;
        this.fullname = fullname;
        this.password = password;
        this.nickname = nickname;
        this.introduce = introduce;
        this.user_img = user_img;
        this.is_private = is_private;
        this.role = role;
    }

    // 연관관계 설정

/*

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
    private List<Comment> commentList = new ArrayList<>();

    @OneToMany(mappedBy = "from_user_id")
    private List<Follow> follower_list = new ArrayList<>();

    @OneToMany(mappedBy = "to_user_id")
    private List<Follow> following_list = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<ChallengeLike> challengeLikeList = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Review> reviews = new ArrayList<>();

*/

}
