package com.JJP.restapiserver.controller.stage;

import com.JJP.restapiserver.domain.dto.stage.PostLikeRequestDto;
import com.JJP.restapiserver.service.stage.PostLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/postlike")
public class PostLikeController {

    private final PostLikeService postLikeService;

    @PostMapping("/like")
    public ResponseEntity like(@RequestBody PostLikeRequestDto postLikeRequestDto)
    {
        return postLikeService.like(postLikeRequestDto);
    }

    @DeleteMapping("/unlike")
    public ResponseEntity unlike(@RequestBody PostLikeRequestDto postLikeRequestDto)
    {
        return postLikeService.unlike(postLikeRequestDto);
    }
}
