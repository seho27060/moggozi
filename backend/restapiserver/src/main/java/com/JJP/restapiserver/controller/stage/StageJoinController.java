package com.JJP.restapiserver.controller.stage;

import com.JJP.restapiserver.domain.dto.stage.StageCompleteDto;
import com.JJP.restapiserver.domain.dto.stage.StageJoinRequestDto;
import com.JJP.restapiserver.service.stage.StageJoinService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/stage/join")
@RestController()
public class StageJoinController {

    private final StageJoinService stageJoinService;

    @PostMapping
    public Long join(@RequestBody StageJoinRequestDto stageJoinRequestDto){

        return stageJoinService.joinStage(stageJoinRequestDto);
    }

    @PutMapping
    public Long complete(@RequestBody StageCompleteDto stageCompleteDto){

        return stageJoinService.completeStage(stageCompleteDto);
    }

    @DeleteMapping
    public Long delete(){

        return null;
    }
}
