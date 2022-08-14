package com.JJP.restapiserver.controller.challenge;

import com.JJP.restapiserver.domain.dto.challenge.ChallengeLikeRequestDto;
import com.JJP.restapiserver.security.JwtUtils;
import com.JJP.restapiserver.service.challenge.ChallengeLikeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

//@CrossOrigin("*")
@RestController
@RequestMapping("/challengeLike")
@RequiredArgsConstructor
public class ChallengeLikeController {

    private final ChallengeLikeService challengeLikeService;

    private final JwtUtils jwtUtils;

    @PostMapping("/like")
    public ResponseEntity like(@RequestBody ChallengeLikeRequestDto challengeLikeRequestDto, HttpServletRequest request)
    {
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
        return challengeLikeService.like(challengeLikeRequestDto, member_id);
    }
}
