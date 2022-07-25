package com.JJP.restapiserver.controller;


import com.JJP.restapiserver.domain.dto.ChallengeCompleteRequestDto;
import com.JJP.restapiserver.service.ChallengeService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/challenge")
@RequiredArgsConstructor
public class ChallengeController {

    @Autowired
    private final ChallengeService challengeService;


    @PutMapping("/complete/{challenge_id}")
    public ResponseEntity completeChallenge(@RequestBody ChallengeCompleteRequestDto challengeCompleteRequestDto)
    {
        try{
            int response = challengeService.completeChallenge(challengeCompleteRequestDto);

        }
        catch
        {

        }

    }
}
