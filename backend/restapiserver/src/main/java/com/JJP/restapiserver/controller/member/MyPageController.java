package com.JJP.restapiserver.controller.member;

import com.JJP.restapiserver.domain.dto.challenge.ChallengePageDto;
import com.JJP.restapiserver.domain.dto.member.response.MyPagePostDto;
import com.JJP.restapiserver.domain.dto.member.response.MyPageResponseDto;
import com.JJP.restapiserver.domain.dto.member.response.MyPageStageDto;
import com.JJP.restapiserver.security.JwtUtils;
import com.JJP.restapiserver.service.challenge.ChallengeService;
import com.JJP.restapiserver.service.post.PostService;
import com.JJP.restapiserver.service.stage.StageJoinService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

//@CrossOrigin("*")
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
        return new ResponseEntity(myPageResponseDto, HttpStatus.OK);
    }
    @GetMapping("/challenge/{member_id}")
    public ResponseEntity myPageChallenge(@PathVariable Long member_id, Pageable pageable){
        ChallengePageDto challengeSlice = challengeService.infiniteChallengeList(member_id, pageable);

        return new ResponseEntity(challengeSlice, HttpStatus.OK);
    }

    @GetMapping("/stage/{member_id}")
    public ResponseEntity myStage(@PathVariable Long member_id, @PageableDefault(size = 2, sort = "joinTime", direction = Sort.Direction.DESC) Pageable pageable){
        MyPageStageDto stageSlice = stageJoinService.infiniteStageList(member_id, pageable);

        return new ResponseEntity(stageSlice, HttpStatus.OK);
    }

    @GetMapping("/post/{member_id}")
    public ResponseEntity myPost(@PathVariable Long member_id, Pageable pageable) {
        MyPagePostDto postSlice = postService.infinitePostList(member_id, pageable);

        return new ResponseEntity(postSlice, HttpStatus.OK);
    }
}