package com.JJP.restapiserver.controller.member;

import com.JJP.restapiserver.domain.dto.member.response.MyPageResponseDto;
import com.JJP.restapiserver.security.JwtUtils;
import com.JJP.restapiserver.service.challenge.ChallengeService;
import com.JJP.restapiserver.service.post.PostService;
import com.JJP.restapiserver.service.stage.StageJoinService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/mypage")
public class MyPageController {

    private final ChallengeService challengeService;
    private final PostService postService;
    private final StageJoinService stageJoinService;
    private final JwtUtils jwtUtils;
    @GetMapping("/info")
    public ResponseEntity myPageInfo(HttpServletRequest request){
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));

        MyPageResponseDto myPageResponseDto = MyPageResponseDto.builder()
                .joinedChallengeNum(challengeService.joinedChallengeNum(member_id))
                .joinedStageNum(stageJoinService.joinedStageNum(member_id))
                .writtenPostNum(postService.writtenPostNum(member_id))
                .recentJoinedChallenge(challengeService.joinedChallengeList8(member_id))
                .recentJoinedStage(stageJoinService.joinedStageList8(member_id))
                .recentWrittenPost(postService.writtenPostList8(member_id))
                .build();
        return null;
    }
}
