package com.JJP.restapiserver.domain.entity.challenge;

import com.JJP.restapiserver.domain.entity.BaseTimeEntity;
import com.JJP.restapiserver.domain.entity.member.Member;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JoinedChallenge  {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    @JsonBackReference
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challenge_id")
    @JsonBackReference
    private Challenge challenge;

    private int state;

    @CreatedDate
    private LocalDateTime createdDate;

    @LastModifiedDate
    private LocalDateTime modifiedDate;

    public void complete(){
        this.state = 2;
    }
}
