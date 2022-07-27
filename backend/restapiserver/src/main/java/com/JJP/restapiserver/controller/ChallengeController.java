package com.JJP.restapiserver.controller;


import com.JJP.restapiserver.domain.dto.ChallengeCompleteRequestDto;
import com.JJP.restapiserver.domain.dto.ChallengeRequestDto;
import com.JJP.restapiserver.domain.entity.challenge.Challenge;
import com.JJP.restapiserver.service.ChallengeService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/challenge")
@RequiredArgsConstructor
public class ChallengeController {

    @Autowired
    private final ChallengeService challengeService;

    @GetMapping("/hobby/{hobby}")
    public ResponseEntity getChallengeListByHobby(@PathVariable("hobby") String hobby){
        List<Challenge> challengeList = challengeService.getChallengeListByHobby(hobby);
        return new ResponseEntity<List<Challenge>>(challengeList,HttpStatus.OK);
    }

    @GetMapping("/search/{keyword}")
    public ResponseEntity getChallengeListByKeyword(@PathVariable String keyword)
    {
        List<Challenge> challengeList = challengeService.getChallengeListByKeyword(keyword);
        return new ResponseEntity<List<Challenge>>(challengeList, HttpStatus.OK);
    }

    @GetMapping("/rank")
    public ResponseEntity getChallengeListByLike()
    {
        List<Challenge> challengeList = challengeService.getChallengeListByLike();
        return new ResponseEntity(challengeList, HttpStatus.OK);
    }

    @GetMapping("/{challenge_id}")
    public ResponseEntity getChallengeDatail(@PathVariable Long challenge_id)
    {
        Challenge challenge = challengeService.getChallengeDetail(challenge_id);
        return new ResponseEntity(challenge, HttpStatus.OK);
    }

    @PostMapping("/save")
    public int saveChallenge(@RequestBody ChallengeRequestDto challengeRequestDto)
    {
        int ret = challengeService.saveChallenge(challengeRequestDto);
        return ret;
    }

    @PutMapping("/{challenge_id}")
    public int updateChallenge(@PathVariable Long challenge_id, @RequestBody ChallengeRequestDto challengeRequestDto)
    {
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
