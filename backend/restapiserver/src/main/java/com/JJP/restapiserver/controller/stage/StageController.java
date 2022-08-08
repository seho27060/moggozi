package com.JJP.restapiserver.controller.stage;

import com.JJP.restapiserver.domain.dto.stage.StageResponseDto;
import com.JJP.restapiserver.domain.dto.stage.StageSaveRequestDto;
import com.JJP.restapiserver.domain.dto.stage.StageUpdateRequestDto;
import com.JJP.restapiserver.service.stage.StageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
//@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/stage")
@RestController()
public class StageController {

    private final StageService stageService;

    @GetMapping("/{challenge_id}")
    public List<StageResponseDto> findById(@PathVariable Long challenge_id){
        return stageService.getStageList(challenge_id);
    }

    @PostMapping("/{challenge_id}")
    public Long save(@PathVariable Long challenge_id, @RequestBody StageSaveRequestDto stageSaveRequestDto){
        return stageService.saveStage(challenge_id, stageSaveRequestDto);
    }

    @GetMapping("/detail/{stage_id}")
    public StageResponseDto stageDetail(@PathVariable Long stage_id){
        return stageService.getStageDetail(stage_id);
    }

    @PutMapping("/{stage_id}")
    public Long update(@PathVariable Long stage_id, @RequestBody StageUpdateRequestDto stageUpdateRequestDto){
        return stageService.updateStage(stage_id, stageUpdateRequestDto);
    }

    @DeleteMapping("/{stage_id}")
    public Long delete(@PathVariable Long stage_id){
        stageService.deleteStage(stage_id);
        return stage_id;
    }
}
