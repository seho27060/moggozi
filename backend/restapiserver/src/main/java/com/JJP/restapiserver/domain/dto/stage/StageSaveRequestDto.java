package com.JJP.restapiserver.domain.dto.stage;

import com.JJP.restapiserver.domain.entity.challenge.Challenge;
import com.JJP.restapiserver.domain.entity.stage.Stage;
import com.JJP.restapiserver.repository.challenge.ChallengeRepository;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class StageSaveRequestDto {
    private String name;
    private int period;
    private String content;
    private String stage_img;
    private Long order;

    @Builder
    public StageSaveRequestDto(String name, int period, String content, String stage_img, Long order){
        this.name = name;
        this.period = period;
        this.content = content;
        this.stage_img = stage_img;
        this.order = order;
    }

    public Stage toEntity(Long challenge_id, ChallengeRepository challengeRepository){
        Challenge challenge = challengeRepository.getById(challenge_id);
        return Stage.builder()
                .name(name)
                .period(period)
                .content(content)
                .stage_img(stage_img)
                .post_order(order)
                .challenge(challenge)
                .build();
    }
}
