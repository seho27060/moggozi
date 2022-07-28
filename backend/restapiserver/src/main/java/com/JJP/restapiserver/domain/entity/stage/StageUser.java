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
    @JoinColumn(name = "user_id")
    @JsonManagedReference
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "stage_id")
    @JsonManagedReference
    private Stage stage;

    private LocalDateTime join_time;

    private LocalDateTime end_time;

    @Builder
    public StageUser(Long id, Member member, Stage stage, LocalDateTime join_time, LocalDateTime end_time) {
        this.id = id;
        this.member = member;
        this.stage = stage;
        this.join_time = join_time;
        this.end_time = end_time;
    }
}
