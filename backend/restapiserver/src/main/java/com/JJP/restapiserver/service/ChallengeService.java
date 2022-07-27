package com.JJP.restapiserver.service;

import com.JJP.restapiserver.domain.Challenge;
import com.JJP.restapiserver.domain.dto.ChallengeCompleteRequestDto;
import com.JJP.restapiserver.domain.dto.ChallengeRequestDto;

import java.util.List;

public interface ChallengeService {
    // 취미에 따른 챌린지 리스트 반환해주는 api
    List<Challenge> getChallengeListByHobby(String hobby);
    // 사용자에 맞춰 추천하는 챌린지 리스트를 반환해주는 api
    List<Challenge> getChallengeListByRecommendation();
    // 검색어에 따른 리스트 반환해주는 api
    List<Challenge> getChallengeListByKeyword(String keyword);
    // 좋아요 순으로 챌린지 리스트 반환하는 api
    List<Challenge> getChallengeListByLike();
    // 챌린지 상세정보를 불러오는 api
    Challenge getChallengeDetail(Long challenge_id);
    // 챌린지 등록하는 api
    int saveChallenge(ChallengeRequestDto challengeData);

    int updateChallenge(Long id, ChallengeRequestDto challengeData);
    // 챌린지 만든 유저가 챌린지를 삭제하게 하는 api
    int deleteChallenge(Long challenge_id);


    // 특정 유저의 챌린지를 완료 상태 변경하는 api
    int completeChallenge(ChallengeCompleteRequestDto challengeCompleteRequestDto);


}
