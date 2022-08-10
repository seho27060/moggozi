package com.JJP.restapiserver.controller.challenge;


import com.JJP.restapiserver.domain.dto.challenge.*;
import com.JJP.restapiserver.domain.entity.Tag.ChallengeTag;
import com.JJP.restapiserver.domain.entity.challenge.Challenge;
import com.JJP.restapiserver.repository.Tag.ChallengeTagRepository;
import com.JJP.restapiserver.repository.challenge.JoinedChallengeRepository;
import com.JJP.restapiserver.security.JwtUtils;
import com.JJP.restapiserver.service.Tag.ChallengeTagService;
import com.JJP.restapiserver.service.challenge.ChallengeService;
import lombok.RequiredArgsConstructor;
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

    @PostMapping("/save")
    public ResponseEntity saveChallenge(@RequestBody ChallengeRequestDto challengeRequestDto, HttpServletRequest request)
    {
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
        challengeRequestDto.setMemberId(member_id);
        ChallengeResponseDto challengeResponseDto = challengeService.saveChallenge(challengeRequestDto);
        return new ResponseEntity(challengeResponseDto, HttpStatus.OK);
    }

    @PutMapping("/register/{challengeId}")
    public ResponseEntity registerChallenge(@PathVariable Long challengeId)
    {
        challengeService.registerChallenge(challengeId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping("/{challenge_id}")
    public ResponseEntity updateChallenge(@PathVariable Long challenge_id, @RequestBody ChallengeRequestDto challengeRequestDto
                ,HttpServletRequest request)
    {
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
        challengeRequestDto.setMemberId(member_id);
        ChallengeResponseDto challengeResponseDto = challengeService.updateChallenge(challenge_id, challengeRequestDto);
        return new ResponseEntity(challengeResponseDto, HttpStatus.OK);
    }
    @DeleteMapping("/{challenge_id}")
    public int deleteChallenge(@PathVariable Long challenge_id)
    {
        int ret = challengeService.deleteChallenge(challenge_id);
        return ret;
    }

    @PutMapping("/complete/{challenge_id}")
    public ResponseEntity completeChallenge(@RequestBody ChallengeCompleteRequestDto challengeCompleteRequestDto)
    {
        int response = challengeService.completeChallenge(challengeCompleteRequestDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/recentCh")
    public ResponseEntity recentChallenge(HttpServletRequest request){
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
        Long num = joinedChallengeRepository.countByMember_id(member_id);
        System.out.println(num);
        return new ResponseEntity<List>(joinedChallengeRepository.findTop8ByMember_idOrderByModifiedDateDesc(member_id), HttpStatus.OK);
    }

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
    @GetMapping("/myChallenge")
    public ResponseEntity getMyChallenge(HttpServletRequest request){
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
        List<ChallengeListResponseDto> challengeListResponseDtoList = challengeService.getMyChallenge(member_id);
        return new ResponseEntity(challengeListResponseDtoList, HttpStatus.OK);
    }

}
