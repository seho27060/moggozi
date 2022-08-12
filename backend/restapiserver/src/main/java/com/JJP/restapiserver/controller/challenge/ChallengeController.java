package com.JJP.restapiserver.controller.challenge;


import com.JJP.restapiserver.domain.dto.challenge.*;
import com.JJP.restapiserver.domain.entity.Tag.ChallengeTag;
import com.JJP.restapiserver.domain.entity.challenge.Challenge;
import com.JJP.restapiserver.repository.Tag.ChallengeTagRepository;
import com.JJP.restapiserver.repository.challenge.JoinedChallengeRepository;
import com.JJP.restapiserver.security.JwtUtils;
import com.JJP.restapiserver.service.Tag.ChallengeTagService;
import com.JJP.restapiserver.service.challenge.ChallengeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

//@CrossOrigin("*")
@RestController
@RequestMapping("/challenge")
@RequiredArgsConstructor
public class ChallengeController {

    private Logger logger = LoggerFactory.getLogger(ChallengeController.class);
    private final ChallengeService challengeService;

    private final JoinedChallengeRepository joinedChallengeRepository;
    @Autowired
    private final JwtUtils jwtUtils;

    private final ChallengeTagService challengeTagService;


//    @GetMapping("/hobby/{hobby}")
//    public ResponseEntity getChallengeListByHobby(@PathVariable("hobby") String hobby,
//                                                  HttpServletRequest request){
//        Long user_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
//        List<ChallengeListResponseDto> challengeList = challengeService.getChallengeListByHobby(hobby, user_id);
//        return new ResponseEntity<>(challengeList,HttpStatus.OK);
//    }

    // challenge/search/식물?page=1&size=2
    @GetMapping("/search")
    public ResponseEntity getChallengeListByKeyword(@RequestParam("keyword") String keyword, Pageable pageable,
                                                    HttpServletRequest request)
    {
        if(request.getHeader("Authorization") != null){
            Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
            ChallengePageDto challengeList = challengeService.getChallengeListByKeyword(keyword,
                pageable, member_id);
            return new ResponseEntity(challengeList, HttpStatus.OK);
        }
        else{
            ChallengePageDto challengeList = challengeService.getChallengeListByKeyword(keyword,
                    pageable);
            return new ResponseEntity(challengeList, HttpStatus.OK);
        }
    }

    @Operation(summary = "챌린지 좋아요 순 5개", description = "")
    @GetMapping("/rank")
    public ResponseEntity getChallengeListByLike(HttpServletRequest request)
    {
        if(request.getHeader("Authorization") != null)
        {
            Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
            List<ChallengeListResponseDto> challengeList = challengeService.getChallengeListByLike(member_id);
            return new ResponseEntity(challengeList, HttpStatus.OK);
        }
        else {
            List<ChallengeListResponseDto> challengeList = challengeService.getChallengeListByLikeWithoutLogin();
            return new ResponseEntity(challengeList, HttpStatus.OK);
        }
    }

    @Operation(summary = "챌린지 상세정보", description = "")
    @GetMapping("/{challenge_id}")
    public ResponseEntity getChallengeDatail(@PathVariable Long challenge_id, HttpServletRequest request)
    {
        if(request.getHeader("Authorization") != null)
        {
            Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
            ChallengeResponseDto challengeResponseDto = challengeService.getChallengeDetail(challenge_id, member_id);
            return new ResponseEntity(challengeResponseDto, HttpStatus.OK);
        }
        else {
            ChallengeResponseDto challengeResponseDto = challengeService.getChallengeDetail(challenge_id);
            return new ResponseEntity(challengeResponseDto, HttpStatus.OK);
        }
    }

    @Operation(summary = "챌린지 임시저장", description = "챌린지 임시저장 버튼과 연동됨")
    @PostMapping("/save")
    public ResponseEntity saveChallenge(@RequestBody ChallengeRequestDto challengeRequestDto, HttpServletRequest request)
    {
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
        challengeRequestDto.setMemberId(member_id);
        ChallengeResponseDto challengeResponseDto = challengeService.saveChallenge(challengeRequestDto);
        return new ResponseEntity(challengeResponseDto, HttpStatus.OK);
    }

    @Operation(summary = "챌린지 등록", description = "챌린지 임시저장과는 다름")
    @PutMapping("/register/{challengeId}")
    public ResponseEntity registerChallenge(@PathVariable Long challengeId)
    {
        challengeService.registerChallenge(challengeId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @Operation(summary = "챌린지 변경", description = "")
    @PutMapping("/{challenge_id}")
    public ResponseEntity updateChallenge(@PathVariable Long challenge_id, @RequestBody ChallengeRequestDto challengeRequestDto
                ,HttpServletRequest request)
    {
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
        challengeRequestDto.setMemberId(member_id);
        ChallengeResponseDto challengeResponseDto = challengeService.updateChallenge(challenge_id, challengeRequestDto);
        return new ResponseEntity(challengeResponseDto, HttpStatus.OK);
    }

    @Operation(summary = "챌린지 이미지 변경")
    @PutMapping("/img/{challenge_id}")
    public ResponseEntity changeImg(@PathVariable Long challenge_id, @RequestBody String path){
        challengeService.changeImg(challenge_id, path);
        return new ResponseEntity(HttpStatus.OK);
    }

    @Operation(summary = "챌린지 삭제", description = "")
    @DeleteMapping("/{challenge_id}")
    public int deleteChallenge(@PathVariable Long challenge_id)
    {
        int ret = challengeService.deleteChallenge(challenge_id);
        return ret;
    }

    @Operation(summary = "챌린지 완료 버튼", description = "챌린지 완료 버튼 누를 시 연동되는 API")
    @PutMapping("/complete/{challenge_id}")
    public ResponseEntity completeChallenge(@RequestBody ChallengeUpdateRequestDto challengeUpdateRequestDto)
    {
        challengeService.completeChallenge(challengeUpdateRequestDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Operation(summary = "최근 참여한 챌린지 8개", description = "최근 참여한 챌린지 8개")
    @GetMapping("/recentCh")
    public ResponseEntity recentChallenge(HttpServletRequest request){
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
        Long num = joinedChallengeRepository.countByMember_id(member_id);
        System.out.println(num);
        return new ResponseEntity<List>(joinedChallengeRepository.findTop8ByMember_idOrderByModifiedDateDesc(member_id), HttpStatus.OK);
    }

    @Operation(summary = "태그를 포함하는 챌린지 검색", description = "페이지네이션 적용된 API")
    @GetMapping("/tag/search/")
    public ResponseEntity getChallengeContainingTag(@RequestParam("keyword") String keyword, Pageable pageable,
                                                    HttpServletRequest request){
        logger.debug("-----------컨트롤러 시작---------------");
        ChallengePageDto challengePageDto = null;
        if(request.getHeader("Authorization") == null){
             challengePageDto = challengeService.getChallengeContainingTag(keyword,
                    pageable);
        }
        else{
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));

            challengePageDto = challengeService.getChallengeContainingTag(keyword,
                pageable, member_id);
        }
        logger.debug("------------컨트롤러 종료---------------");
        return new ResponseEntity(challengePageDto, HttpStatus.OK);
    }

    @Operation(summary = "만든 챌린지", description = "내가 만든 챌린지 API")
    @GetMapping("/myChallenge")
    public ResponseEntity getMyChallenge(HttpServletRequest request){
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
        List<ChallengeListResponseDto> challengeListResponseDtoList = challengeService.getMyChallenge(member_id);
        return new ResponseEntity(challengeListResponseDtoList, HttpStatus.OK);
    }

    @Operation(summary = "추천챌린지", description = "사용자 맞춤 추천 챌린지 API")
    @GetMapping("/recommendation")
    public ResponseEntity getRecommendationList(HttpServletRequest request){
        if(request.getHeader("Authorization") != null){
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
        List<ChallengeListResponseDto> challengeListResponseDtoList = challengeService.getChallengeRecommendationList(member_id, 5);
        return new ResponseEntity(challengeListResponseDtoList, HttpStatus.OK);
        }
        else{
            List<ChallengeListResponseDto> challengeListResponseDtoList = challengeService.getChallengeRecommendationList(-1L,5);
            return new ResponseEntity(challengeListResponseDtoList, HttpStatus.OK);
        }
    }

    @Operation(summary = "챌린지 도전", description = "챌린지 도전 버튼을 눌렀을 시 연결되는 API")
    @PostMapping("/tryChallenge")
    public ResponseEntity tryChallenge(@RequestBody ChallengeUpdateRequestDto challengeRequestDto){
        challengeService.tryChallenge(challengeRequestDto);
        return new ResponseEntity(HttpStatus.OK);
    }

    @Operation(summary = "챌린지 도전 취소", description = "챌린지 도전 취소 버튼과 연결되는 API")
    @DeleteMapping("/cancelChallenge")
    public ResponseEntity deleteChallenge(@RequestBody ChallengeUpdateRequestDto challengeUpdateRequestDto){
        challengeService.cancelChallenge(challengeUpdateRequestDto);
        return new ResponseEntity(HttpStatus.OK);
    }



}
