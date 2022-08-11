package com.JJP.restapiserver.service.challenge;

import com.JJP.restapiserver.domain.dto.challenge.*;
import com.JJP.restapiserver.domain.entity.challenge.Challenge;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ChallengeService {
    // 취미에 따른 챌린지 리스트 반환해주는 api -삭제 예정
//    List<ChallengeListResponseDto> getChallengeListByHobby(String hobby, Long member_id);
    // 사용자에 맞춰 추천하는 챌린지 리스트를 반환해주는 api
    List<ChallengeListResponseDto> getChallengeListByRecommendation();
    // 검색어에 따른 리스트 반환해주는 api
    ChallengePageDto getChallengeListByKeyword(String keyword, Pageable pageable, Long member_id);
    ChallengePageDto getChallengeListByKeyword(String keyword, Pageable pageable);
    // 좋아요 순으로 챌린지 리스트 반환하는 api
    List<ChallengeListResponseDto> getChallengeListByLike(Long member_id);
    List<ChallengeListResponseDto> getChallengeListByLikeWithoutLogin();
    // 챌린지 상세정보를 불러오는 api
    ChallengeResponseDto getChallengeDetail(Long challenge_id, Long member_id);
    ChallengeResponseDto getChallengeDetail(Long challenge_id);
    // 챌린지 등록하는 api
    ChallengeResponseDto saveChallenge(ChallengeRequestDto challengeData);

    ChallengeResponseDto registerChallenge(Long challenge_ide);
    ChallengeResponseDto updateChallenge(Long id, ChallengeRequestDto challengeData);
    // 챌린지 만든 유저가 챌린지를 삭제하게 하는 api
    int deleteChallenge(Long challenge_id);


    // 특정 유저의 챌린지를 완료 상태 변경하는 api
    int completeChallenge(ChallengeCompleteRequestDto challengeCompleteRequestDto);

    Long joinedChallengeNum(Long member_id);

    List<ChallengeListResponseDto> joinedChallengeList8(Long member_id);

    ChallengePageDto infiniteChallengeList(Long member_id, Pageable pageable);

    List<ChallengeListResponseDto> getChallengeRecommendationList(Long member_id, int size);

    ChallengePageDto getChallengeContainingTag(String keyword, Pageable pageable, Long member_id);
    ChallengePageDto getChallengeContainingTag(String keyword, Pageable pageable);

    List<ChallengeListResponseDto> getMyChallenge(Long member_id);


}
