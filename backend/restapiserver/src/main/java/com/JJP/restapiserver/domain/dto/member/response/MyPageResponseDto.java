package com.JJP.restapiserver.domain.dto.member.response;

import com.JJP.restapiserver.domain.dto.challenge.ChallengeListResponseDto;
import com.JJP.restapiserver.domain.dto.post.PostResponseDto;
import com.JJP.restapiserver.domain.dto.stage.StageResponseDto;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class MyPageResponseDto {
    private Long joinedChallengeNum;
    private List<ChallengeListResponseDto> recentJoinedChallenge;

    private Long joinedStageNum;
    private List<StageResponseDto> recentJoinedStage;

    private Long writtenPostNum;
    private List<PostResponseDto> recentWrittenPost;

//    private UserResponsDto userResponsDto
}
