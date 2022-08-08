package com.JJP.restapiserver.service.stage;

import com.JJP.restapiserver.domain.dto.stage.StageResponseDto;
import com.JJP.restapiserver.domain.dto.stage.StageSaveRequestDto;
import com.JJP.restapiserver.domain.dto.stage.StageUpdateRequestDto;
import com.JJP.restapiserver.domain.entity.stage.Stage;
import com.JJP.restapiserver.repository.challenge.ChallengeRepository;
import com.JJP.restapiserver.repository.stage.StageRepository;
import com.JJP.restapiserver.repository.stage.StageUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class StageServiceImpl implements StageService {

    private  final StageRepository stageRepository;
    private  final StageUserRepository stageUserRepository;
    private final ChallengeRepository challengeRepository;

    @Transactional(readOnly = true)
    @Override
    public List<StageResponseDto> getStageList(Long challenge_id) {
        List<Stage> stageList = stageRepository.findAllByChallenge_id(challenge_id);
        List<StageResponseDto> stageResponseDtoList = new ArrayList<>();
        if(stageList != null){
            for(Stage stage : stageList){
                stageResponseDtoList.add(new StageResponseDto(stage));
            }
        }
        return stageResponseDtoList;
    }

    @Transactional(readOnly = true)
    @Override
    public StageResponseDto getStageDetail(Long id) {

        Stage entity = stageRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + id));
        return new StageResponseDto(entity);
    }

    @Transactional
    @Override
    public Long saveStage(Long challenge_id, StageSaveRequestDto stageRequestDto) {
        return stageRepository.save(stageRequestDto.toEntity(challenge_id, challengeRepository)).getId();
    }

    @Transactional
    @Override
    public Long updateStage(Long id, StageUpdateRequestDto stageUpdateRequestDto) {

        Stage entity = stageRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + id));

        entity.update(stageUpdateRequestDto.getName(), stageUpdateRequestDto.getContent(), stageUpdateRequestDto.getImg());

        return id;
    }

    @Transactional
    @Override
    public void deleteStage(Long id) {
        Stage entity = stageRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + id));

        stageRepository.delete(entity);
    }
}
