package com.JJP.restapiserver.controller.stage;

import com.JJP.restapiserver.domain.dto.stage.StageCompleteDto;
import com.JJP.restapiserver.domain.dto.stage.StageJoinRequestDto;
import com.JJP.restapiserver.security.JwtUtils;
import com.JJP.restapiserver.service.stage.StageJoinService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/stage/join")
@RestController()
public class StageJoinController {

    private final StageJoinService stageJoinService;
    private final JwtUtils jwtUtils;

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

    @GetMapping("/{stage_id}")
    public int stateStage(@PathVariable Long stage_id, HttpServletRequest request){
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
        return stageJoinService.stateStage(member_id, stage_id);
    }
}
