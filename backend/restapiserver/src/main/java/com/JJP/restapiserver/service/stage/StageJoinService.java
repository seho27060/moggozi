package com.JJP.restapiserver.service.stage;

import com.JJP.restapiserver.domain.dto.member.response.MyPageStageDto;
import com.JJP.restapiserver.domain.dto.stage.StageCompleteDto;
import com.JJP.restapiserver.domain.dto.stage.StageJoinRequestDto;
import com.JJP.restapiserver.domain.dto.stage.StageResponseDto;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface StageJoinService {
    Long joinStage(StageJoinRequestDto stageJoinRequestDto);
    Long completeStage(StageCompleteDto stageCompleteDto);
    Long joinedStageNum(Long member_id);
    void deleteJoin(Long stage_id, Long member_id);

    List<StageResponseDto> joinedStageList8(Long member_id);

    int stateStage(Long member_id, Long stage_id);

    MyPageStageDto infiniteStageList(Long member_id, Pageable pageable);
}
