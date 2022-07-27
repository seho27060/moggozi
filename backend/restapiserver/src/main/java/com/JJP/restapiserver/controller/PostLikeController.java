package com.JJP.restapiserver.controller;

import com.JJP.restapiserver.domain.dto.PostLikeRequestDto;
import com.JJP.restapiserver.service.PostLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
