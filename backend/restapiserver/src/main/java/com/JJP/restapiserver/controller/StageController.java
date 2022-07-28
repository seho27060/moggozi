package com.JJP.restapiserver.controller;

import com.JJP.restapiserver.domain.dto.StageSaveRequestDto;
import com.JJP.restapiserver.domain.entity.stage.Stage;
import com.JJP.restapiserver.service.StageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
public class StageController {

    private final StageService stageService;

    @GetMapping("/stage/{challenge_id}")
    public List<Stage> findById(@PathVariable Long challenge_id){
        return stageService.getStageList(challenge_id);
    }

    @PostMapping("/stage/{challenge_id}")
    public Long save(@PathVariable Long challenge_id, @RequestBody StageSaveRequestDto stageSaveRequestDto){
        return stageService.saveStage(challenge_id, stageSaveRequestDto);
    }

    @GetMapping("/test")
    public String test(){
        return "test";
    }
}
