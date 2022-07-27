package com.JJP.restapiserver.service;

import com.JJP.restapiserver.domain.dto.StageResponseDto;
import com.JJP.restapiserver.domain.dto.StageSaveRequestDto;
import com.JJP.restapiserver.domain.dto.StageUpdateRequestDto;
import com.JJP.restapiserver.domain.entity.stage.Stage;
import com.JJP.restapiserver.repository.StageRepository;
import com.JJP.restapiserver.repository.StageUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class StageServiceImpl implements StageService {

    private  final StageRepository stageRepository;
    private  final StageUserRepository stageUserRepository;

    @Override
    public List<Stage> getStageList(Long challenge_id) {
        return stageRepository.findAllByChallenge_id(challenge_id);
    }

    @Override
    public StageResponseDto getStageDetail(Long stage_id) {

        Stage entity = stageRepository.findById(stage_id).orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + stage_id));
        return new StageResponseDto(entity);
    }

    @Override
    public Long saveStage(StageSaveRequestDto stageRequestDto) {
        return stageRepository.save(stageRequestDto.toEntity()) .getId();
    }

    @Override
    public Long updateStage(Long stage_id, StageUpdateRequestDto stageRequestDto) {

        Stage entity = stageRepository.findById(stage_id).orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + stage_id));

        entity.update(stageRequestDto.getName(), stageRequestDto.getContent(), stageRequestDto.getStage_img());

        return stage_id;
    }

    @Override
    public void deleteStage(Long stage_id) {
        Stage entity = stageRepository.findById(stage_id).orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + stage_id));

        stageRepository.delete(entity);
    }

    @Override
    public Long challengeStage(Long stage_id, Long stageuser_id) {
        return null;
    }
}
