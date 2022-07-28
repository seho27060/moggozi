package com.JJP.restapiserver.controller;

import com.JJP.restapiserver.domain.dto.StageResponseDto;
import com.JJP.restapiserver.domain.dto.StageSaveRequestDto;
import com.JJP.restapiserver.domain.entity.stage.Stage;
import com.JJP.restapiserver.service.StageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RequestMapping("/stage")
@RestController()
public class StageController {

    private final StageService stageService;

    @GetMapping("/{challenge_id}")
    public List<Stage> findById(@PathVariable Long challenge_id){
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
    public Long modify(@PathVariable Long stage_id){
        return null;
    }

    @DeleteMapping("/{stage_id}")
    public Long delete(@PathVariable Long stage_id){
        return null;
    }
}
