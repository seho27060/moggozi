package com.JJP.restapiserver.controller.stage;

import com.JJP.restapiserver.domain.dto.stage.StageCompleteDto;
import com.JJP.restapiserver.domain.dto.stage.StageJoinRequestDto;
import com.JJP.restapiserver.security.JwtUtils;
import com.JJP.restapiserver.service.stage.StageJoinService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

//@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/stage/join/{stage_id}")
@RestController()
public class StageJoinController {

    private final StageJoinService stageJoinService;
    private final JwtUtils jwtUtils;

    @PostMapping
    public Long join(@PathVariable Long stage_id, HttpServletRequest request){
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
        StageJoinRequestDto stageJoinRequestDto = StageJoinRequestDto.builder()
                .stage_id(stage_id)
                .member_id(member_id)
                .build();
        return stageJoinService.joinStage(stageJoinRequestDto);
    }

    @PutMapping
    public Long complete(@PathVariable Long stage_id, @RequestBody int state, HttpServletRequest request){
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
        StageCompleteDto stageCompleteDto = StageCompleteDto.builder()
                .stage_id(stage_id)
                .member_id(member_id)
                .build();
        return stageJoinService.changeStageState(stageCompleteDto, state);
    }

    @DeleteMapping
    public Long delete(@PathVariable Long stage_id, HttpServletRequest request){
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
        stageJoinService.deleteJoin(member_id, stage_id);
        return stage_id;
    }

    @GetMapping
    public int stateStage(@PathVariable Long stage_id, HttpServletRequest request){
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
        return stageJoinService.stateStage(member_id, stage_id);
    }
}
