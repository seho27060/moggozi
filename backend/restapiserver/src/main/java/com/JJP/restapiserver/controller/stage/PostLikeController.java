package com.JJP.restapiserver.controller.stage;

import com.JJP.restapiserver.domain.dto.stage.PostLikeRequestDto;
import com.JJP.restapiserver.security.JwtUtils;
import com.JJP.restapiserver.service.post.PostLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/postlike")
public class PostLikeController {

    private final PostLikeService postLikeService;

    private final JwtUtils jwtUtils;

    @PostMapping("/like")
    public ResponseEntity like(@RequestBody PostLikeRequestDto postLikeRequestDto, HttpServletRequest request)
    {
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
        return postLikeService.like(postLikeRequestDto, member_id);
    }

}
