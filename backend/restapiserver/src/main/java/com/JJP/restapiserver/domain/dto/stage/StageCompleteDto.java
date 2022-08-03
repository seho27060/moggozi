package com.JJP.restapiserver.domain.dto.stage;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class StageCompleteDto {
    private Long id;
    @CreatedDate
    private LocalDateTime complete_time;
    private Long member_id;
    private Long stage_id;
    private int state;

    @Builder
    public StageCompleteDto(Long member_id, Long stage_id){
        this.complete_time = LocalDateTime.now();
        this.member_id = member_id;
        this.stage_id = stage_id;
        this.state = 1;
    }
}
