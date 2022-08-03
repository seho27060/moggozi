package com.JJP.restapiserver.domain.entity.stage;

import com.JJP.restapiserver.domain.entity.member.Member;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class StageUser {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    // 멤버와 다대일 양방향 관계
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @JsonManagedReference
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stage_id")
    @JsonManagedReference
    private Stage stage;

    private LocalDateTime joinTime;

    private LocalDateTime endTime;
    private int state;

    @Builder
    public StageUser(Long id, Member member, Stage stage, LocalDateTime join_time, LocalDateTime end_time, int state) {
        this.id = id;
        this.member = member;
        this.stage = stage;
        this.joinTime = join_time;
        this.endTime = end_time;
        this.state = state;
    }
    public void complete(){
        this.endTime = LocalDateTime.now();
        this.state = 1;
    }
    private int state;


    public void complete(){
        this.endTime = LocalDateTime.now();
        this.state = 1;
    }

}
