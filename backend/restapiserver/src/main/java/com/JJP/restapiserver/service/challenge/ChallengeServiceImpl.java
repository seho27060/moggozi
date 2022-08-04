package com.JJP.restapiserver.service.challenge;

import com.JJP.restapiserver.domain.dto.challenge.*;
import com.JJP.restapiserver.domain.dto.tag.TagRequestDto;
import com.JJP.restapiserver.domain.dto.tag.TagResponseDto;
import com.JJP.restapiserver.domain.entity.Tag.ChallengeTag;
import com.JJP.restapiserver.domain.entity.Tag.Tag;
import com.JJP.restapiserver.domain.entity.challenge.Challenge;
import com.JJP.restapiserver.domain.entity.challenge.JoinedChallenge;
import com.JJP.restapiserver.domain.entity.member.Member;
import com.JJP.restapiserver.repository.Tag.ChallengeTagRepository;
import com.JJP.restapiserver.repository.Tag.TagRepository;
import com.JJP.restapiserver.repository.challenge.ChallengeRepository;
import com.JJP.restapiserver.repository.challenge.JoinedChallengeRepository;
import com.JJP.restapiserver.repository.member.MemberRepository;
import com.JJP.restapiserver.repository.stage.StageUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@CrossOrigin("*")
@Service
@RequiredArgsConstructor
public class ChallengeServiceImpl implements ChallengeService{

    private final JoinedChallengeRepository joinedChallengeRepository;
    private final ChallengeRepository challengeRepository;
    private final MemberRepository memberRepository;
    private final TagRepository tagRepository;
    private final ChallengeTagRepository challengeTagRepository;


    @Override
    public List<ChallengeListResponseDto> getChallengeListByHobby(String hobby, Long member_id) {

        List<Challenge> challengeList = challengeRepository.findByHobby(hobby);
        List<ChallengeListResponseDto> responseDtoList = new ArrayList<>();
        return challengeIntoListDto(challengeList, responseDtoList, member_id);
    }

    // 미구현
    @Override
    public List<ChallengeListResponseDto> getChallengeListByRecommendation() {

        return null;
    }

    //테스트 완료
    @Override
    public List<ChallengeListResponseDto> getChallengeListByKeyword(String keyword, Long member_id) {
        List<Challenge> challengeList = challengeRepository.findByNameContaining(keyword);
        List<ChallengeListResponseDto> responseDtoList = new ArrayList<>();
        return challengeIntoListDto(challengeList, responseDtoList, member_id);
    }



    @Override
    public List<ChallengeListResponseDto> getChallengeListByLike(Long member_id) {
        List<Object[]> list = challengeRepository.findByLike();
        List<Challenge> challengeList = new ArrayList<>();
        for(int i = 0; i < list.size(); i++)
        {
            Challenge challenge = challengeRepository.findById(Long.parseLong(list.get(i)[0].toString())).get();
            challengeList.add(challenge);
        }
        List<ChallengeListResponseDto> responseDtoList = new ArrayList<>();
        return challengeIntoListDto(challengeList, responseDtoList, member_id);
    }
    public List<ChallengeListResponseDto> getChallengeListByLikeWithoutLogin() {
        List<Object[]> list = challengeRepository.findByLike();
        List<Challenge> challengeList = new ArrayList<>();
        List<ChallengeListResponseDto> responseDtoList = new ArrayList<>();
        if(list != null)
        {

            for(int i = 0; i < list.size(); i++)
            {
                Challenge challenge = challengeRepository.findById(Long.parseLong(list.get(i)[0].toString())).get();
                challengeList.add(challenge);
            }
            for(int i = 0; i < challengeList.size(); i++){
                responseDtoList.add(new ChallengeListResponseDto(challengeList.get(i)));
            }
        }
        return responseDtoList;
    }

    @Override
    public ChallengeResponseDto getChallengeDetail(Long challenge_id, Long member_id) {
        Challenge challenge = challengeRepository.findById(challenge_id).get();
        List<Challenge> challengeList = new ArrayList<>();
        challengeList.add(challenge);

        List<ChallengeResponseDto> challengeResponseDtoList = new ArrayList<>();
        return challengeIntoDto(challengeList, challengeResponseDtoList, member_id).get(0);
    }

    @Override
    public ChallengeResponseDto getChallengeDetail(Long challenge_id) {
        Challenge challenge = challengeRepository.findById(challenge_id).get();
        List<Challenge> challengeList = new ArrayList<>();
        challengeList.add(challenge);

        List<ChallengeResponseDto> challengeResponseDtoList = new ArrayList<>();
        return challengeIntoDto(challengeList, challengeResponseDtoList).get(0);
    }

    @Override
    public ChallengeResponseDto saveChallenge(ChallengeRequestDto challengeData) {
        Member member = memberRepository.findById(challengeData.getMemberId()).get();
        Challenge challenge = Challenge.builder()
                .member(member)
                .name(challengeData.getName())
                .challenge_img(challengeData.getImg())
                .content(challengeData.getContent())
                .level(challengeData.getLevel())
                .state(challengeData.getState())
                .description(challengeData.getDescription())
                .build();
        challenge =  challengeRepository.save(challenge);

        tagRegister(challenge.getId(), challengeData);
        ChallengeResponseDto challengeResponseDto = new ChallengeResponseDto(challenge);
        return challengeResponseDto;
    }

    @Override
    public ChallengeResponseDto updateChallenge(Long challenge_id, ChallengeRequestDto challengeData) {

        Challenge challenge = challengeRepository.findById(challenge_id).get();
        challenge.updateChallenge(challengeData);
        challengeRepository.save(challenge);

        for(int i = 0; i < challenge.getChallengeTagList().size(); i++)
        {
            Long index = challenge.getChallengeTagList().get(i).getId();
            challengeTagRepository.deleteById(index);
        }

        tagRegister(challenge_id, challengeData);
        ChallengeResponseDto challengeResponseDto = new ChallengeResponseDto(challenge);
        return challengeResponseDto;
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
        Challenge challenge = challengeRepository.findById(challengeCompleteRequestDto.getChallengeId()).get();
        JoinedChallenge joinedChallenge = joinedChallengeRepository.
                findByChallenge_idAndMember_id(challengeCompleteRequestDto.getChallengeId(),
                        challengeCompleteRequestDto.getMemberId()).get();
        // 완료되었다는 상태가 2임
        joinedChallenge.setState(2);
        return 0;
    }

    @Override
    public Long joinedChallengeNum(Long member_id) {
        return joinedChallengeRepository.countByMember_id(member_id);
    }

    @Override
    public List<ChallengeListResponseDto> joinedChallengeList8(Long member_id) {
        List<JoinedChallenge> joinedChallengeList = joinedChallengeRepository.findTop8ByMember_idOrderByModifiedDateDesc(member_id);
        List<ChallengeListResponseDto> challengeListResponseDtoList = new ArrayList<>();
        if(joinedChallengeList != null)
        {
            for(int i = 0; i < joinedChallengeList.size(); i++)
            {
                Challenge challenge = joinedChallengeList.get(i).getChallenge();
                ChallengeListResponseDto challengeResponseDto = new ChallengeListResponseDto(challenge);
                challengeListResponseDtoList.add(challengeResponseDto);
            }
        }
        return challengeListResponseDtoList;

    }

    @Override
    public List<ChallengeSimpleResponseDto> infiniteChallengeList(Long member_id, Pageable pageable) {
        Slice<Challenge> challengeSlice = joinedChallengeRepository.findByMember_idOrderByStateDesc(member_id, pageable);
        List<ChallengeSimpleResponseDto> challengeSimpleResponseDtoList =
                challengeSlice.stream().map(o -> ChallengeSimpleResponseDto.builder()
                        .id(o.getId())
                        .img(o.getChallenge_img())
                        .level(o.getLevel())
                        .name(o.getName())
                        .state(o.getState())
                        .build())
                        .collect(Collectors.toList());
        challengeSlice.
        return null;
    }

    public List<ChallengeResponseDto> challengeIntoDto(List<Challenge> challengeList, List<ChallengeResponseDto> responseDtoList
                                 , Long member_id)
    {
        for(int i = 0; i < challengeList.size(); i++)
        {
            Challenge challenge = challengeList.get(i);
            ChallengeResponseDto challengeResponseDto = new ChallengeResponseDto(challenge);
            List<String> temp = new ArrayList<>();
            for(int j = 0; j < challenge.getChallengeTagList().size(); j++)
            {
                Tag tag = challenge.getChallengeTagList().get(j).getTag();
                challengeResponseDto.getHobbyList().add(new TagResponseDto(tag.getId(), tag.getTag()));
            }
            Optional<JoinedChallenge> joinedChallenge = joinedChallengeRepository.findByChallenge_idAndMember_id(
                    challenge.getId(), member_id
            );
            if(joinedChallenge.isPresent())
            {
                challengeResponseDto.setUserProgress(joinedChallenge.get().getState());
            }
            responseDtoList.add(challengeResponseDto);
        }
        return responseDtoList;
    }
    public List<ChallengeResponseDto> challengeIntoDto(List<Challenge> challengeList, List<ChallengeResponseDto> responseDtoList)
    {
        for(int i = 0; i < challengeList.size(); i++)
        {
            Challenge challenge = challengeList.get(i);
            ChallengeResponseDto challengeResponseDto = new ChallengeResponseDto(challenge);
            for(int j = 0; j < challenge.getChallengeTagList().size(); j++)
            {
                Tag tag = challenge.getChallengeTagList().get(j).getTag();
                challengeResponseDto.getHobbyList().add(new TagResponseDto(tag.getId(), tag.getTag()));
            }
            responseDtoList.add(challengeResponseDto);
        }
        return responseDtoList;
    }
    public List<ChallengeListResponseDto> challengeIntoListDto(List<Challenge> challengeList, List<ChallengeListResponseDto> responseDtoList
            , Long member_id)
    {
        for(int i = 0; i < challengeList.size(); i++)
        {
            Challenge challenge = challengeList.get(i);
            ChallengeListResponseDto challengeListResponseDto = new ChallengeListResponseDto(challenge);
            List<String> temp = new ArrayList<>();
            for(int j = 0; j < challenge.getChallengeTagList().size(); j++)
            {
                Tag tag = challenge.getChallengeTagList().get(j).getTag();
                challengeListResponseDto.getHobbyList().add(new TagResponseDto(tag.getId(), tag.getTag()));
            }
            Optional<JoinedChallenge> joinedChallenge = joinedChallengeRepository.findByChallenge_idAndMember_id(
                    challenge.getId(), member_id
            );
            if(joinedChallenge.isPresent())
            {
                challengeListResponseDto.setUserProgress(joinedChallenge.get().getState());
            }
            responseDtoList.add(challengeListResponseDto);
        }
        return responseDtoList;
    }

    public void tagRegister(Long challenge_id, ChallengeRequestDto challengeData)
    {
        Challenge challenge = challengeRepository.findById(challenge_id).get();

        List<TagRequestDto> tagList = challengeData.getHobbyList();
        if(tagList != null)
            for(int i = 0; i < tagList.size(); i++)
            {
                String tag = tagList.get(i).getName();
                Tag tagEntity;
                // 태그 리스트 중에서 이미 태그가 존재한다면
                // 챌린지가 이미 취미로 집어넣은 태그인지 확인한다.
                if(tagRepository.existsByTag(tag))
                    tagEntity = tagRepository.getByTag(tag);
                    // 아예 처음 생기는 태그라면, 태그 테이블에 집어넣고
                    // 사용자 취미 태그 테이블에도 집어넣어 준다.
                else{
                    tagEntity = Tag.builder()
                            .tag(tag)
                            .build();
                    tagRepository.save(tagEntity);
                }
                challengeTagRepository.save(ChallengeTag.builder()
                        .challenge(challenge)
                        .tag(tagEntity)
                        .build());
            }
    }
}
