package com.JJP.restapiserver.controller.challenge;


import com.JJP.restapiserver.domain.dto.challenge.ChallengeCompleteRequestDto;
import com.JJP.restapiserver.domain.dto.challenge.ChallengeListResponseDto;
import com.JJP.restapiserver.domain.dto.challenge.ChallengeRequestDto;
import com.JJP.restapiserver.domain.dto.challenge.ChallengeResponseDto;
import com.JJP.restapiserver.domain.entity.challenge.Challenge;
import com.JJP.restapiserver.security.JwtUtils;
import com.JJP.restapiserver.service.challenge.ChallengeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/challenge")
@RequiredArgsConstructor
public class ChallengeController {

    private final ChallengeService challengeService;

    @Autowired
    private final JwtUtils jwtUtils;

    @GetMapping("/hobby/{hobby}")
    public ResponseEntity getChallengeListByHobby(@PathVariable("hobby") String hobby,
                                                  HttpServletRequest request){
        Long user_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
        System.out.println("***************** jwt TOken: " + request.getHeader("Authorization"));
        List<ChallengeListResponseDto> challengeList = challengeService.getChallengeListByHobby(hobby, user_id);
        return new ResponseEntity<List<ChallengeListResponseDto>>(challengeList,HttpStatus.OK);
    }

    @GetMapping("/search/{keyword}")
    public ResponseEntity getChallengeListByKeyword(@PathVariable String keyword, HttpServletRequest request)
    {
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
        List<ChallengeListResponseDto> challengeList = challengeService.getChallengeListByKeyword(keyword, member_id);
        return new ResponseEntity<List<ChallengeListResponseDto>>(challengeList, HttpStatus.OK);
    }

    @GetMapping("/rank")
    public ResponseEntity getChallengeListByLike(HttpServletRequest request)
    {
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));

        List<ChallengeListResponseDto> challengeList = challengeService.getChallengeListByLike(member_id);
        return new ResponseEntity(challengeList, HttpStatus.OK);
    }

    @GetMapping("/{challenge_id}")
    public ResponseEntity getChallengeDatail(@PathVariable Long challenge_id, HttpServletRequest request)
    {
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
        ChallengeResponseDto challengeResponseDto = challengeService.getChallengeDetail(challenge_id, member_id);
        return new ResponseEntity(challengeResponseDto, HttpStatus.OK);
    }

    @PostMapping("/save")
    public int saveChallenge(@RequestBody ChallengeRequestDto challengeRequestDto, HttpServletRequest request)
    {
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
        challengeRequestDto.setMemberId(member_id);
        int ret = challengeService.saveChallenge(challengeRequestDto);
        return ret;
    }

    @PutMapping("/{challenge_id}")
    public int updateChallenge(@PathVariable Long challenge_id, @RequestBody ChallengeRequestDto challengeRequestDto
                ,HttpServletRequest request)
    {
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
        challengeRequestDto.setMemberId(member_id);
        int ret = challengeService.updateChallenge(challenge_id, challengeRequestDto);
        return ret;
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


}
