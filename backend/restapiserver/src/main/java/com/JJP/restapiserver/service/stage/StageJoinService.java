package com.JJP.restapiserver.service.stage;

import com.JJP.restapiserver.domain.dto.stage.StageCompleteDto;
import com.JJP.restapiserver.domain.dto.stage.StageJoinRequestDto;

public interface StageJoinService {
    Long joinStage(StageJoinRequestDto stageJoinRequestDto);
    Long completeStage(StageCompleteDto stageCompleteDto);
}
