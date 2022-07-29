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

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
    public List<ChallengeResponseDto> getChallengeListByHobby(String hobby) {

        List<Challenge> challengeList = challengeRepository.findByHobby(hobby);

        List<ChallengeResponseDto> responseDtoList = new ArrayList<>();
        for(int i = 0; i < challengeList.size(); i++)
        {
            Challenge challenge = challengeList.get(i);
            ChallengeResponseDto challengeResponseDto = new ChallengeResponseDto(challenge);
            List<String> temp = new ArrayList<>();
            for(int j = 0; j < challenge.getChallengeTagList().size(); j++)
            {
                Tag tag = challenge.getChallengeTagList().get(j).getTag();
//                String tag = tagRepository.getById(tag_id).getTag();
                challengeResponseDto.getTagList().add(tag.getTag());
            }
            int complete_sum = challenge.getStageList().size() * 2;
            int sum = 0;
            for(int j = 0; j < challenge.getStageList().size(); j++){
                sum += challenge.getStageList().get(i).getS
            }
            responseDtoList.add(challengeResponseDto);
        }

        return responseDtoList;
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
        Member member = memberRepository.findById(challengeData.user_id).get();
        Challenge challenge = Challenge.builder()
                .member(member)
                .name(challengeData.getName())
                .challenge_img(challengeData.getChallenge_img())
                .content(challengeData.getContent())
                .level(challengeData.getLevel())
                .state(challengeData.getState())
                .build();
        Long challenge_id = challengeRepository.save(challenge).getId();

        // 여러 개의 태그 리스트를 프론트에서 보내준 데이터에서 받는다.
        List<TagRequestDto> tagList = challengeData.getHobby();
        List<ChallengeTag> challengeTagList = new ArrayList<>();
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
