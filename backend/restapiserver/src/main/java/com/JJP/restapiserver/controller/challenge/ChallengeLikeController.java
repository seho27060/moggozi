package com.JJP.restapiserver.controller.challenge;

import com.JJP.restapiserver.domain.dto.challenge.ChallengeLikeRequestDto;
import com.JJP.restapiserver.service.challenge.ChallengeLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin("*")
@RestController
@RequestMapping("/challengeLike")
@RequiredArgsConstructor
public class ChallengeLikeController {

    private final ChallengeLikeService challengeLikeService;

    @PostMapping("/like")
    public ResponseEntity like(@RequestBody ChallengeLikeRequestDto challengeLikeRequestDto)
    {
        return challengeLikeService.like(challengeLikeRequestDto);
    }
}
