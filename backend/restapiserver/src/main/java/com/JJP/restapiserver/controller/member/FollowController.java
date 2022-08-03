package com.JJP.restapiserver.controller.member;

import com.JJP.restapiserver.security.JwtUtils;
import com.JJP.restapiserver.service.member.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class FollowController {

    private final FollowService followService;
    private final JwtUtils jwtUtils;

    @PostMapping("/follow/{toId}")
    public final ResponseEntity<?> followMember(@PathVariable("toId") Long toMemberId, HttpServletRequest servletRequest) {
        Long fromMemberId = getMemberId(servletRequest);
        return followService.follow(fromMemberId, toMemberId);
    }

    @PostMapping("/unfollow/{toId}")
    public final ResponseEntity<?> unfollowMember(@PathVariable("toId") Long toMemberId, HttpServletRequest servletRequest) {
        Long fromMemberId = getMemberId(servletRequest);
        return followService.unfollow(fromMemberId, toMemberId);
    }

    private Long getMemberId(HttpServletRequest servletRequest) {
        return jwtUtils.getUserIdFromJwtToken(servletRequest.getHeader("Authorization"));
    }

}
