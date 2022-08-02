package com.JJP.restapiserver.domain.dto.stage;

import com.JJP.restapiserver.domain.entity.member.Member;
import com.JJP.restapiserver.domain.entity.stage.Stage;
import com.JJP.restapiserver.domain.entity.stage.StageUser;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class StageJoinRequestDto {
    @CreatedDate
    private LocalDateTime join_time;
    private Long member_id;
    private Long stage_id;
    private int state;

    @Builder
    public StageJoinRequestDto(LocalDateTime join_time, Long member_id, Long stage_id, int state){
        this.join_time = join_time;
        this.member_id = member_id;
        this.stage_id = stage_id;
        this.state = state;
    }

    public StageUser toEntity(Member member_id, Stage stage_id){
        return StageUser.builder()
                .join_time(LocalDateTime.now())
                .member(member_id)
                .stage(stage_id)
                .state(0)
                .build();
    }
}
