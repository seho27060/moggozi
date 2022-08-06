package com.JJP.restapiserver.service.challenge;

import com.JJP.restapiserver.domain.dto.challenge.ChallengeLikeRequestDto;
import com.JJP.restapiserver.domain.entity.challenge.ChallengeLike;
import com.JJP.restapiserver.repository.challenge.ChallengeLikeRepository;
import com.JJP.restapiserver.repository.challenge.ChallengeRepository;
import com.JJP.restapiserver.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
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
            challengeLikeRepository.delete(challengeLike.get());
        else
            challengeLikeRepository.save(ChallengeLike.builder()
                    .member(memberRepository.getById(member_id))
                    .challenge(challengeRepository.getById(challengeLikeRequestDto.getChallengeId()))
                    .build());
        return new ResponseEntity(HttpStatus.OK);
    }


}
