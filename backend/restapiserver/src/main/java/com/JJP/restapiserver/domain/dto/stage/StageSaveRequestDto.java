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
    private String content;
    private String stageImg;
    private Long order;

    @Builder
    public StageSaveRequestDto(String name, String content, String stage_img, Long order){
        this.name = name;
        this.content = content;
        this.stageImg = stage_img;
        this.order = order;
    }

    public Stage toEntity(Long challenge_id, ChallengeRepository challengeRepository){
        Challenge challenge = challengeRepository.getById(challenge_id);
        return Stage.builder()
                .name(name)
                .content(content)
                .stage_img(stageImg)
                .post_order(order)
                .challenge(challenge)
                .build();
    }
}
