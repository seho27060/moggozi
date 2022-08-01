package com.JJP.restapiserver.service.challenge;

import com.JJP.restapiserver.domain.dto.challenge.ChallengeCompleteRequestDto;
import com.JJP.restapiserver.domain.dto.challenge.ChallengeRequestDto;
import com.JJP.restapiserver.domain.dto.challenge.ChallengeResponseDto;
import com.JJP.restapiserver.domain.dto.tag.TagRequestDto;
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
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@CrossOrigin("*")
@Service
@RequiredArgsConstructor
public class ChallengeServiceImpl implements ChallengeService{

    private final JoinedChallengeRepository joinedChallengeRepository;
    private final ChallengeRepository challengeRepository;
    private final MemberRepository memberRepository;
    private final TagRepository tagRepository;
    private final ChallengeTagRepository challengeTagRepository;
    private final StageUserRepository stageUserRepository;

//    private final MemberTagRepository memberTagRepository;

    @Override
    public List<ChallengeResponseDto> getChallengeListByHobby(String hobby, Long member_id) {

        List<Challenge> challengeList = challengeRepository.findByHobby(hobby);
        List<ChallengeResponseDto> responseDtoList = new ArrayList<>();
        return challengeIntoDto(challengeList, responseDtoList, member_id);
    }

    // 미구현
    @Override
    public List<ChallengeResponseDto> getChallengeListByRecommendation() {

        return null;
    }

    //테스트 완료
    @Override
    public List<ChallengeResponseDto> getChallengeListByKeyword(String keyword, Long member_id) {
        List<Challenge> challengeList = challengeRepository.findByNameContaining(keyword);
        List<ChallengeResponseDto> responseDtoList = new ArrayList<>();
        return challengeIntoDto(challengeList, responseDtoList, member_id);
    }



    @Override
    public List<ChallengeResponseDto> getChallengeListByLike(Long member_id) {
        List<Object[]> list = challengeRepository.findByLike();
        List<Challenge> challengeList = new ArrayList<>();
        for(int i = 0; i < list.size(); i++)
        {
            Challenge challenge = challengeRepository.findById(Long.parseLong(list.get(i)[0].toString())).get();
            challengeList.add(challenge);
        }
        List<ChallengeResponseDto> responseDtoList = new ArrayList<>();
        return challengeIntoDto(challengeList, responseDtoList, member_id);
    }

    @Override
    public ChallengeResponseDto getChallengeDetail(Long challenge_id, Long member_id) {
        Challenge challenge = challengeRepository.findById(challenge_id).get();
        List<Challenge> challengeList = new ArrayList<>();
        challengeList.add(challenge);

        List<ChallengeResponseDto> challengeResponseDtoList = new ArrayList<>();
        return challengeIntoDto(challengeList, challengeResponseDtoList, member_id).get(0);
    }

    public Challenge getChallengeDetail2(Long challenge_id, Long member_id) {
        Challenge challenge = challengeRepository.findById(challenge_id).get();
        return challenge;
    }

    @Override
    public int saveChallenge(ChallengeRequestDto challengeData) {
        Member member = memberRepository.findById(challengeData.getMember_id()).get();
        Challenge challenge = Challenge.builder()
                .member(member)
                .name(challengeData.getName())
                .challenge_img(challengeData.getChallenge_img())
                .content(challengeData.getContent())
                .level(challengeData.getLevel())
                .state(challengeData.getState())
                .build();
        Long challenge_id = challengeRepository.save(challenge).getId();

        tagRegister(challenge_id, challengeData);
        return 0;
    }

    @Override
    public int updateChallenge(Long challenge_id, ChallengeRequestDto challengeData) {

        Challenge challenge = challengeRepository.findById(challenge_id).get();
        challenge.updateChallenge(challengeData);
        challengeRepository.save(challenge);

        for(int i = 0; i < challenge.getChallengeTagList().size(); i++)
        {
            Long index = challenge.getChallengeTagList().get(i).getId();
            challengeTagRepository.deleteById(index);
        }

        tagRegister(challenge_id, challengeData);

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
        JoinedChallenge joinedChallenge = joinedChallengeRepository.
                findByChallenge_idAndMember_id(challengeCompleteRequestDto.getChallenge_id(),
                        challengeCompleteRequestDto.getMember_id()).get();
        // 완료되었다는 상태가 2임
        joinedChallenge.setState(2);
        return 0;
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
                challengeResponseDto.getTagList().add(tag);
            }
            Optional<JoinedChallenge> joinedChallenge = joinedChallengeRepository.findByChallenge_idAndMember_id(
                    challenge.getId(), member_id
            );
            if(joinedChallenge.isPresent())
            {
                challengeResponseDto.setUser_progress(joinedChallenge.get().getState());
            }
            responseDtoList.add(challengeResponseDto);
        }
        return responseDtoList;
    }

    public void tagRegister(Long challenge_id, ChallengeRequestDto challengeData)
    {
        Challenge challenge = challengeRepository.findById(challenge_id).get();

        List<TagRequestDto> tagList = challengeData.getHobby();
        for(int i = 0; i < tagList.size(); i++)
        {
            String tag = tagList.get(i).getTag();
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
