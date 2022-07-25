package com.JJP.restapiserver.service;

import com.JJP.restapiserver.domain.dto.ChallengeCompleteRequestDto;
import com.JJP.restapiserver.domain.entity.challenge.Challenge;
import com.JJP.restapiserver.repository.ChallengeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChallengeServiceImpl implements ChallengeService{

    private final ChallengeRepository challengeRepository;

    // 테스트 완료
    @Override
    public List<Challenge> getChallengeListByHobby(String hobby) {
        return null;
    }

    // 미구현
    @Override
    public List<Challenge> getChallengeListByRecommendation() {
        return null;
    }

    //테스트 완료
    @Override
    public List<Challenge> getChallengeListByKeyword(String keyword) {
        return null;
    }



    @Override
    public List<Challenge> getChallengeListByLike() {
        return null;
    }

    // 테스트 완료
    @Override
    public Challenge getChallengeDetail(Long challenge_id) {
        return null;
    }


    // 테스트 완료
    @Override
    public int deleteChallenge(Long challenge_id) {
        return 0;
    }

    @Override
    public int completeChallenge(ChallengeCompleteRequestDto challengeCompleteRequestDto) {
        // 상태를 변화시켜줄 챌린지를 찾음.
        Challenge challenge = challengeRepository.findById(challengeCompleteRequestDto.getChallenge_id()).get();
        //

        return 0;
    }
}
