package com.JJP.restapiserver.service;

import com.JJP.restapiserver.domain.Challenge;
import com.JJP.restapiserver.domain.dto.ChallengeCompleteRequestDto;
import com.JJP.restapiserver.domain.dto.ChallengeRequestDto;
import com.JJP.restapiserver.domain.entity.challenge.JoinedChallenge;
import com.JJP.restapiserver.repository.ChallengeRepository;
import com.JJP.restapiserver.repository.JoinedChallengeRepository;
import com.JJP.restapiserver.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChallengeServiceImpl implements ChallengeService{

    private final JoinedChallengeRepository joinedChallengeRepository;
    private final ChallengeRepository challengeRepository;

    private final MemberRepository memberRepository;

    // 테스트 완료
    @Override
    public List<Challenge> getChallengeListByHobby(String hobby) {

        return challengeRepository.findByHobby(hobby);
    }

    // 미구현
    @Override
    public List<Challenge> getChallengeListByRecommendation() {

        return null;
    }

    //테스트 완료
    @Override
    public List<Challenge> getChallengeListByKeyword(String keyword) {

        return challengeRepository.findByNameContaining(keyword);
    }



    //구현 완료?
    @Override
    public List<Challenge> getChallengeListByLike() {

        List<Object[]> list = challengeRepository.findByLike();
        List<Challenge> challengeList = new ArrayList<>();
        for(int i = 0; i < list.size(); i++)
        {
            Challenge challenge = challengeRepository.findById((Long)(list.get(i)[0])).get();
            challengeList.add(challenge);
        }
        return challengeList;
    }

    // 테스트 완료
    @Override
    public Challenge getChallengeDetail(Long challenge_id) {
        Challenge challenge = challengeRepository.findById(challenge_id).get();
        return challenge;
    }

    @Override
    public int saveChallenge(ChallengeRequestDto challengeData) {
//        Member member = memberRepository.findById(challengeData.user_id).get();
        Challenge challenge = Challenge.builder()
//                .member(member)
                .name(challengeData.getName())
                .challenge_img(challengeData.getChallenge_img())
                .content(challengeData.getContent())
                .level(challengeData.getLevel())
                .hobby(challengeData.getHobby())
                .state(challengeData.getState())
                .build();
        challengeRepository.save(challenge);
        return 0;
    }

    @Override
    public int updateChallenge(Long challenge_id, ChallengeRequestDto challengeData) {

        Challenge challenge = challengeRepository.findById(challenge_id).get();
        challenge.updateChallenge(challengeData);
        challengeRepository.save(challenge);
        return 0;
    }


    // 테스트 완료
    @Override
    public int deleteChallenge(Long challenge_id) {
        challengeRepository.deleteById(challenge_id);
        return 0;
    }

    @Override
    public int completeChallenge(ChallengeCompleteRequestDto challengeCompleteRequestDto) {

        // 상태를 변화시켜줄 챌린지를 찾음.
        Challenge challenge = challengeRepository.findById(challengeCompleteRequestDto.getChallenge_id()).get();
        Optional<JoinedChallenge> joinedChallenge = joinedChallengeRepository.
                findByChallenge_idAndMember_id(challengeCompleteRequestDto.getChallenge_id(), challengeCompleteRequestDto.getUser_id());
        // 완료되었다는 상태가 2임
        joinedChallenge.get().setState(2);
        return 0;
    }
}
