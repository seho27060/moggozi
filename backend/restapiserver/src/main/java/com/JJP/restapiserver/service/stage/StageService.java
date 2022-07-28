package com.JJP.restapiserver.service.stage;

import com.JJP.restapiserver.domain.dto.StageResponseDto;
import com.JJP.restapiserver.domain.dto.StageSaveRequestDto;
import com.JJP.restapiserver.domain.dto.StageUpdateRequestDto;
import com.JJP.restapiserver.domain.entity.stage.Stage;

import java.util.List;

public interface StageService {

    // 스테이지 리스트 조회
    List<Stage> getStageList(Long challenge_id);

    // 스테이지 상세 페이지
    StageResponseDto getStageDetail(Long stage_id);

    // 스테이지 등록
    Long saveStage(Long challenge_id, StageSaveRequestDto stageRequestDto);

    // 스테이지 수정
    Long updateStage(Long stage_id, StageUpdateRequestDto stageRequestDto);

    // 스테이지 삭제
    void deleteStage(Long stage_id);

    // 스테이지 도전
    Long challengeStage(Long stage_id, Long stageuser_id);
}
