package com.JJP.restapiserver.service.stage;

import com.JJP.restapiserver.domain.dto.challenge.ChallengeListResponseDto;
import com.JJP.restapiserver.domain.dto.stage.StageCompleteDto;
import com.JJP.restapiserver.domain.dto.stage.StageJoinRequestDto;
import com.JJP.restapiserver.domain.dto.stage.StageResponseDto;

import java.util.List;

public interface StageJoinService {
    Long joinStage(StageJoinRequestDto stageJoinRequestDto);
    Long completeStage(StageCompleteDto stageCompleteDto);
    Long joinedStageNum(Long member_id);

    List<StageResponseDto> joinedStageList8(Long member_id);
}
