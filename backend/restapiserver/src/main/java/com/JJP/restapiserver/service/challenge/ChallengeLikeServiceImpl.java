package com.JJP.restapiserver.service.challenge;

import com.JJP.restapiserver.domain.dto.challenge.ChallengeLikeRequestDto;
import com.JJP.restapiserver.domain.entity.challenge.Challenge;
import com.JJP.restapiserver.domain.entity.challenge.ChallengeLike;
import com.JJP.restapiserver.repository.challenge.ChallengeLikeRepository;
import com.JJP.restapiserver.repository.challenge.ChallengeRepository;
import com.JJP.restapiserver.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class ChallengeLikeServiceImpl implements ChallengeLikeService{

    private final ChallengeLikeRepository challengeLikeRepository;
    private final ChallengeRepository challengeRepository;
    private final MemberRepository memberRepository;

    @Override
    public ResponseEntity like(ChallengeLikeRequestDto challengeLikeRequestDto, Long member_id) {

        Optional<ChallengeLike> challengeLike = challengeLikeRepository.findByMember_idAndChallenge_id(
                member_id, challengeLikeRequestDto.getChallengeId()
        );
        if(challengeLike.isPresent())
            return new ResponseEntity(HttpStatus.OK);
        else{

            challengeLikeRepository.save(ChallengeLike.builder()
                    .member(memberRepository.getById(member_id))
                    .challenge(challengeRepository.getById(challengeLikeRequestDto.getChallengeId()))
                    .build());
            Challenge challenge = challengeRepository.getById(challengeLikeRequestDto.getChallengeId());
            challenge.addLikeNum();
        }
        return new ResponseEntity(HttpStatus.OK);
    }


}
