package com.JJP.restapiserver.controller.challenge;

import com.JJP.restapiserver.domain.dto.ChallengeLikeRequestDto;
import com.JJP.restapiserver.service.challenge.ChallengeLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/challengeLike")
@RequiredArgsConstructor
public class ChallengeLikeController {

    private ChallengeLikeService challengeLikeService;

    @PostMapping("/like")
    public ResponseEntity like(@RequestBody ChallengeLikeRequestDto challengeLikeRequestDto)
    {
        return challengeLikeService.like(challengeLikeRequestDto);
    }

    @DeleteMapping("/unlike")
    public ResponseEntity unlike(@RequestBody ChallengeLikeRequestDto challengeLikeRequestDto)
    {
        return challengeLikeService.unlike(challengeLikeRequestDto);
    }
}
