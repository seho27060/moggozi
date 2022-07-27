package com.JJP.restapiserver.service;

import com.JJP.restapiserver.domain.dto.ChallengeLikeRequestDto;
import com.JJP.restapiserver.domain.entity.challenge.ChallengeLike;
import com.JJP.restapiserver.repository.ChallengeLikeRepository;
import com.JJP.restapiserver.repository.ChallengeRepository;
import com.JJP.restapiserver.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChallengeLikeServiceImpl implements ChallengeLikeService{

    private final ChallengeLikeRepository challengeLikeRepository;
    private final ChallengeRepository challengeRepository;
    private final MemberRepository memberRepository;

    @Override
    public ResponseEntity like(ChallengeLikeRequestDto challengeLikeRequestDto) {

        ChallengeLike challengeLike = ChallengeLike.builder()
                .member(memberRepository.getById(challengeLikeRequestDto.getMember_id()))
                .challenge(challengeRepository.getById(challengeLikeRequestDto.getChallenge_id()))
                .build();
        challengeLikeRepository.save(challengeLike);
        return new ResponseEntity(HttpStatus.OK);
    }

    @Override
    public ResponseEntity unlike(ChallengeLikeRequestDto challengeLikeRequestDto) {
        ChallengeLike challengeLike = challengeLikeRepository.findByMember_idAndChallenge_id(challengeLikeRequestDto.getMember_id(),
                challengeLikeRequestDto.getChallenge_id()).get();
        challengeLikeRepository.delete(challengeLike);
        return new ResponseEntity(HttpStatus.OK);
    }
}
