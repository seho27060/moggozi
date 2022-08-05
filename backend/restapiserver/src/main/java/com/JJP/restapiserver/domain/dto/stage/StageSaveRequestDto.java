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
    private String img;

    @Builder
    public StageSaveRequestDto(String name, String content, String img){
        this.name = name;
        this.content = content;
        this.img = img;
    }

    public Stage toEntity(Long challenge_id, ChallengeRepository challengeRepository){
        Challenge challenge = challengeRepository.getById(challenge_id);
        return Stage.builder()
                .name(name)
                .content(content)
                .img(img)
                .challenge(challenge)
                .build();
    }
}
