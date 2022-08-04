package com.JJP.restapiserver.controller.member;

import com.JJP.restapiserver.security.JwtUtils;
import com.JJP.restapiserver.service.member.FollowService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    // 조회하는 유저가 팔로우하는 리스트
    @GetMapping("/following/{fromMemberId}")
    public final ResponseEntity<?> followingList(@PathVariable("fromMemberId") Long fromMemberId) {
        return followService.followingList(fromMemberId);
    }

    // 조회하는 유저를 팔로우하는 리스트 - 로그인한 유저가 팔로우하는 상대면 상태 표시 필요 (follow_state)
    @GetMapping("/followed/{toMemberId}/{loginId}")
    public final ResponseEntity<?> followedList(@PathVariable("toMemberId") Long toMemberId, @PathVariable("toMemberId") Long loginId) {
        return followService.followedList(toMemberId, loginId);
    }
    // 멤버 아이디 획득을 위해 공통으로 쓰이는 메소드
    private final Long getMemberId(HttpServletRequest servletRequest) {
       return jwtUtils.getUserIdFromJwtToken(servletRequest.getHeader("Authorization"));
    }

}
