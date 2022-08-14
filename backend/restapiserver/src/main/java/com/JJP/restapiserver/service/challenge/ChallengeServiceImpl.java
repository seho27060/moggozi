package com.JJP.restapiserver.service.challenge;

import com.JJP.restapiserver.domain.dto.challenge.*;
import com.JJP.restapiserver.domain.dto.stage.StageJoinRequestDto;
import com.JJP.restapiserver.domain.dto.tag.TagRequestDto;
import com.JJP.restapiserver.domain.dto.tag.TagResponseDto;
import com.JJP.restapiserver.domain.entity.Tag.ChallengeTag;
import com.JJP.restapiserver.domain.entity.Tag.MemberTag;
import com.JJP.restapiserver.domain.entity.Tag.Tag;
import com.JJP.restapiserver.domain.entity.challenge.Challenge;
import com.JJP.restapiserver.domain.entity.challenge.ChallengeLike;
import com.JJP.restapiserver.domain.entity.challenge.JoinedChallenge;
import com.JJP.restapiserver.domain.entity.member.Member;
import com.JJP.restapiserver.domain.entity.stage.Stage;
import com.JJP.restapiserver.repository.Tag.ChallengeTagRepository;
import com.JJP.restapiserver.repository.Tag.MemberTagRepository;
import com.JJP.restapiserver.repository.Tag.TagRepository;
import com.JJP.restapiserver.repository.challenge.ChallengeLikeRepository;
import com.JJP.restapiserver.repository.challenge.ChallengeRepository;
import com.JJP.restapiserver.repository.challenge.JoinedChallengeRepository;
import com.JJP.restapiserver.repository.member.MemberRepository;
import com.JJP.restapiserver.service.Tag.ChallengeTagService;
import com.JJP.restapiserver.service.stage.StageJoinService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@CrossOrigin("*")
@Service
@RequiredArgsConstructor
@Transactional
public class ChallengeServiceImpl implements ChallengeService{

    private final Logger logger = LoggerFactory.getLogger(ChallengeServiceImpl.class);
    private final JoinedChallengeRepository joinedChallengeRepository;
    private final ChallengeRepository challengeRepository;
    private final MemberRepository memberRepository;
    private final TagRepository tagRepository;
    private final ChallengeTagRepository challengeTagRepository;

    private final StageJoinService stageJoinService;
    private final ChallengeLikeRepository challengeLikeRepository;

    private final MemberTagRepository memberTagRepository;

    private final ChallengeTagService challengeTagService;

//    @Override
//    public List<ChallengeListResponseDto> getChallengeListByHobby(String hobby, Long member_id) {
//
//        List<Challenge> challengeList = challengeRepository.findByHobby(hobby);
//        List<ChallengeListResponseDto> responseDtoList = new ArrayList<>();
//        return challengeIntoListDto(challengeList, responseDtoList, member_id);
//    }

    // 미구현
    @Override
    public List<ChallengeListResponseDto> getChallengeListByRecommendation() {

        return null;
    }

    //테스트 완료
    @Override
    public ChallengePageDto getChallengeListByKeyword(String keyword,Pageable pageable,  Long member_id) {
        Page<Challenge> challengeList = challengeRepository.findByStateAndNameContaining(1, keyword,pageable);

        List<ChallengeListResponseDto> challengeListResponseDtoList = new ArrayList<>();
        challengeListResponseDtoList = challengeIntoListDto(challengeList.toList(), challengeListResponseDtoList,
                member_id);
        // 전체 페이지 개수, 조회한 데이터, 현재 페이지 번호, 혀재 데이터의 사이즈, 전체 데이터 갯수
        ChallengePageDto challengePageDto = ChallengePageDto.builder()
                .content(challengeListResponseDtoList)
                .pageNum(challengeList.getNumber())
                .totalPages(challengeList.getTotalPages())
                .size(challengeList.getSize())
                .totalElements(challengeList.getTotalElements())
                .hasNext(challengeList.hasNext())
                .build();

        return challengePageDto;
    }
    public ChallengePageDto getChallengeListByKeyword(String keyword,Pageable pageable) {
        Page<Challenge> challengeList = challengeRepository.findByStateAndNameContaining(1,keyword,pageable);

        List<ChallengeListResponseDto> challengeListResponseDtoList = new ArrayList<>();
        challengeListResponseDtoList = challengeIntoListDto(challengeList.toList(), challengeListResponseDtoList);
        // 전체 페이지 개수, 조회한 데이터, 현재 페이지 번호, 혀재 데이터의 사이즈, 전체 데이터 갯수
        ChallengePageDto challengePageDto = ChallengePageDto.builder()
                .content(challengeListResponseDtoList)
                .pageNum(challengeList.getNumber())
                .totalPages(challengeList.getTotalPages())
                .size(challengeList.getSize())
                .totalElements(challengeList.getTotalElements())
                .hasNext(challengeList.hasNext())
                .build();

        return challengePageDto;
    }



    @Override
    public ChallengePageDto getChallengeListByLike(Long member_id, Pageable pageable) {
        Page<Challenge> list = challengeRepository.findByStateOrderByLikeNumDesc(1,pageable);
        List<Challenge> challengeList = list.toList();

        List<ChallengeListResponseDto> responseDtoList = new ArrayList<>();
        responseDtoList = challengeIntoListDto(challengeList, responseDtoList, member_id);
        ChallengePageDto challengePageDto = ChallengePageDto.builder()
                .pageNum(list.getNumber())
                .size(list.getSize())
                .content(responseDtoList)
                .hasNext(list.hasNext())
                .totalElements(list.getTotalElements())
                .totalPages(list.getTotalPages())
                .build();
        return challengePageDto;
    }
    public ChallengePageDto getChallengeListByLikeWithoutLogin(Pageable pageable) {
        Page<Challenge> list = challengeRepository.findByStateOrderByLikeNumDesc(1, pageable);
        List<Challenge> challengeList = list.toList();

        List<ChallengeListResponseDto> responseDtoList = new ArrayList<>();
        responseDtoList = challengeIntoListDto(challengeList, responseDtoList);
        ChallengePageDto challengePageDto = ChallengePageDto.builder()
                .pageNum(list.getNumber())
                .size(list.getSize())
                .content(responseDtoList)
                .hasNext(list.hasNext())
                .totalElements(list.getTotalElements())
                .totalPages(list.getTotalPages())
                .build();
        return challengePageDto;
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
                .likeNum(0)
                // 임시저장이기 때문에 작성 중이라는 뜻으로 state 값을 0으로 넣어줌.
                .state(0)
                .description(challengeData.getDescription())
                .build();
        challenge =  challengeRepository.save(challenge);

        tagRegister(challenge.getId(), challengeData);
        ChallengeResponseDto challengeResponseDto = new ChallengeResponseDto(challenge);
        return challengeResponseDto;
    }

    @Override
    public ChallengeResponseDto registerChallenge(Long member_id, Long challenge_id){
        Optional<Challenge> challenge = challengeRepository.findByMember_idAndId(member_id, challenge_id);
        if(challenge.isPresent()){
            challenge.get().register();
            return new ChallengeResponseDto(challenge.get());
        }
        return null;
    }

    @Override
    public ChallengeResponseDto updateChallenge(Long challenge_id, ChallengeRequestDto challengeData) {

        Challenge challenge = challengeRepository.findById(challenge_id).get();
        // 이미 등록이 완료된 챌린지임.
        if(challenge.getState() == 2){
            return null;
        }
        if(challenge.getMember().getId() == challengeData.getMemberId())
        {
            challenge.updateChallenge(challengeData);
            if(challenge.getChallengeTagList() != null)
            {
                for(int i = 0; i < challenge.getChallengeTagList().size(); i++)
                {
                    Long index = challenge.getChallengeTagList().get(i).getId();
                    ChallengeTag challengeTag = challengeTagRepository.getById(index);
                    challengeTagRepository.delete(challengeTag);
                }
            }
            challenge.getChallengeTagList().clear();
            tagRegister(challenge_id, challengeData);
            return new ChallengeResponseDto(challenge);
        }
        else
            return null;
    }


    // 테스트 완료
    @Override
    public int deleteChallenge(Long member_id, Long challenge_id) {
        Optional<Challenge> challenge = challengeRepository.findById(challenge_id);
        if(challenge.isPresent()){
            if(challenge.get().getMember().getId() == member_id){
                if(challenge.get().getState() == 2)
                    return -3;
                challengeRepository.delete(challenge.get());
                return 1;
            }
            else return -2;
        }
        else
            return -1;
    }
    @Override
    public int deleteChallenge(Long challenge_id) {
        Optional<Challenge> challenge = challengeRepository.findById(challenge_id);
        if(challenge.isPresent()){
            challengeRepository.delete(challenge.get());
            return 1;
            }
        return 0;
    }

    @Override
    public ChallengePageDto getByMember_idOrderByModifiedDateDesc(Long member_id, Pageable pageable) {
        Page<JoinedChallenge> list = joinedChallengeRepository.findByMember_idOrderByModifiedDateDesc(member_id, pageable);
        List<JoinedChallenge> joinedChallengeList = list.toList();
        List<Challenge> challengeList = joinedChallengeList.stream().map(o -> o.getChallenge()).collect(Collectors.toList());

        List<ChallengeListResponseDto> responseDtoList = new ArrayList<>();
        responseDtoList = challengeIntoListDto(challengeList, responseDtoList, member_id);
        ChallengePageDto challengePageDto = ChallengePageDto.builder()
                .pageNum(list.getNumber())
                .size(list.getSize())
                .content(responseDtoList)
                .hasNext(list.hasNext())
                .totalElements(list.getTotalElements())
                .totalPages(list.getTotalPages())
                .build();
        return challengePageDto;
    }


    @Override
    public int completeChallenge(Long member_id, Long challenge_id) {
        Optional<Challenge> challenge = challengeRepository.findById(challenge_id);
        if(challenge.isPresent()){
            Optional<JoinedChallenge> joinedChallenge = joinedChallengeRepository.
                    findByChallenge_idAndMember_id(challenge_id,
                            member_id);
            // 완료되었다는 상태가 2임
            if(joinedChallenge.isPresent())
            {
                if(joinedChallenge.get().getState() == 1){
                    joinedChallenge.get().complete();
                    return 1;
                }
            }
            else
                return -1;
        }
        return -1;
    }

    @Override
    public boolean tryChallenge(ChallengeUpdateRequestDto challengeUpdateRequestDto) {
        Challenge challenge = challengeRepository.findById(challengeUpdateRequestDto.getChallengeId()).get();
        Member member = memberRepository.findById(challengeUpdateRequestDto.getMemberId()).get();
        Optional<JoinedChallenge> result =joinedChallengeRepository.findByChallenge_idAndMember_id(challengeUpdateRequestDto.getChallengeId(),
                challengeUpdateRequestDto.getMemberId());
        if(result.isPresent()){
            return false;
        }
        else{
        // 도전한다는게 1임
        JoinedChallenge joinedChallenge = joinedChallengeRepository.
                save(JoinedChallenge.builder()
                                .state(1)
                                .challenge(challenge)
                                .member(member)
                                .build());
        for(Stage stage : challenge.getStageList()) {
            stageJoinService.joinStage(new StageJoinRequestDto(challengeUpdateRequestDto.getMemberId(), stage.getId(),1));
        }
        return true;
        }
    }

    @Override
    public void cancelChallenge(Long member_id, Long challenge_id) {
        Optional<JoinedChallenge> joinedChallenge = joinedChallengeRepository.
                findByChallenge_idAndMember_id(challenge_id,
                        member_id);
        if(joinedChallenge.isPresent()){
            joinedChallengeRepository.delete(joinedChallenge.get());
        }
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
            for (JoinedChallenge joinedChallenge : joinedChallengeList) {
                Challenge challenge = joinedChallenge.getChallenge();
                ChallengeListResponseDto challengeResponseDto = new ChallengeListResponseDto(challenge);
                challengeListResponseDtoList.add(challengeResponseDto);
            }
        }
        return challengeListResponseDtoList;

    }

    @Override
    public ChallengePageDto infiniteChallengeList(Long member_id, Pageable pageable) {
        Slice<JoinedChallenge> challengeSlice = joinedChallengeRepository.findByMember_idOrderByCreatedDateDesc(member_id, pageable);

        // joinedchallenge -> challenge_index -> challenge
        List<Long> challenge_ids = challengeSlice.stream().map(o -> o.getChallenge().getId()).collect(Collectors.toList());
        // challenge_index -> challenge
        List<Challenge> challengeList = challengeRepository.findByStateAndIdIn(1, challenge_ids);
        List<ChallengeSimpleResponseDto> challengeSimpleResponseDtoList = new ArrayList<>();
        for(Challenge challenge : challengeList){
            int state = 0;
            for(JoinedChallenge joinedChallenge : challengeSlice){
                if(joinedChallenge.getChallenge().getId() == challenge.getId()){
                    state = joinedChallenge.getState();
                }
            }
            ChallengeSimpleResponseDto challengeSimpleResponseDto = ChallengeSimpleResponseDto.builder()
                    .id(challenge.getId())
                    .img(challenge.getChallenge_img())
                    .name(challenge.getName())
                    .level(challenge.getLevel())
                    .state(state)
                    .build();
            challengeSimpleResponseDtoList.add(challengeSimpleResponseDto);
        }
        ChallengePageDto challengePageDto = ChallengePageDto.builder()
                .pageNum(challengeSlice.getNumber())
                .content(challengeSimpleResponseDtoList)
                .size(challengeSlice.getSize())
                .hasNext(challengeSlice.hasNext())
                .build();
        return challengePageDto;
    }


    @Override
    public List<ChallengeListResponseDto> getChallengeRecommendationList(Long member_id, int size) {
        List<MemberTag> myhobby = memberTagRepository.findTop5ByMember_idOrderByCreatedDateDesc(member_id);
        logger.debug("---------------------------------------------------");
        logger.debug(myhobby.toString());
        List<ChallengeListResponseDto> challengeListResponseDtoList = new ArrayList<>();
        if(myhobby.isEmpty()){
            logger.debug("---------------------취미 없음---------------");
            List<Challenge> challengeList = challengeRepository.findRandomChallengeList(5);
            return challengeIntoListDto(challengeList, new ArrayList<ChallengeListResponseDto>(), member_id);
        }
        // 사용자가 취미가 있다면?
        else{
            // 내가 최근에 고른 5개의 취미의 인덱스
            List<Long> tag_ids = myhobby.stream().map(o -> o.getTag().getId()).collect(Collectors.toList());
            //
            logger.debug("-------------내가 가진 취미 번호 리스트 --------------");
            logger.debug(tag_ids.toString());
            List<Tag> myTag = tagRepository.findByIdIn(tag_ids);


            List<JoinedChallenge> joinedChallengeList = joinedChallengeRepository.findByMember_id(member_id);
            logger.debug("내가 지금까지 참여한 챌린지 번호 리스트");
            List<Long> joined_ids = joinedChallengeList.stream().map(o -> o.getChallenge().getId()).collect(Collectors.toList());
            logger.debug(joined_ids.toString());
            for(int i =0; i < tag_ids.size(); i++){
                logger.debug("내가 지금까지 참여한 챌린지 번호 리스트");
                logger.debug(joined_ids.toString());
                // 내가 원하는 태그 중에 좋아요가 가장 많고 참여하지 않은 챌린지 하나 반환
                List<Object[]> results = challengeRepository.findUnJoinedChallenge(joined_ids, tag_ids.get(i));

                if(!results.isEmpty()){
                    // 그런 챌린지가 있다면 현재 검색의 기준이 됐던 태그를 가지고 있는 챌린지를 찾아서 joined_ids에 넣어줌.
                    Challenge challenge = challengeRepository.getById(Long.parseLong(results.get(0)[0].toString()));
                    ChallengeListResponseDto challengeListResponseDto = new ChallengeListResponseDto(challenge);
                    challengeListResponseDtoList.add(challengeListResponseDto);
                    List<Challenge> challengeList = challengeRepository.findChallengeContainsTag(tag_ids.get(i));
                    List<Long> additional = challengeList.stream().map(o -> o.getId()).collect(Collectors.toList());
                    logger.debug("------------------내가 검색한 챌린지와 태그를 공유하는 모든 챌린지-----------");
                    logger.debug(joined_ids.toString());
                    joined_ids.addAll(additional);

                    }
                else {
                    logger.debug("---------------------못해먹겠네 진짜---------------");
                }
            }
        }
        return challengeListResponseDtoList;
    }

    public List<ChallengeResponseDto> challengeIntoDto(List<Challenge> challengeList, List<ChallengeResponseDto> responseDtoList
                                 , Long member_id)
    {
        for (Challenge challenge : challengeList) {
            ChallengeResponseDto challengeResponseDto = new ChallengeResponseDto(challenge);
            Optional<ChallengeLike> challengeLike = challengeLikeRepository.findByMember_idAndChallenge_id(
                    member_id, challenge.getId()
            );
            if (challengeLike.isPresent())
                challengeResponseDto.setLiked(true);
            List<String> temp = new ArrayList<>();
            for (int j = 0; j < challenge.getChallengeTagList().size(); j++) {
                Tag tag = challenge.getChallengeTagList().get(j).getTag();
                challengeResponseDto.getHobbyList().add(new TagResponseDto(tag.getId(), tag.getTag()));
            }
            Optional<JoinedChallenge> joinedChallenge = joinedChallengeRepository.findByChallenge_idAndMember_id(
                    challenge.getId(), member_id
            );
            joinedChallenge.ifPresent(value -> challengeResponseDto.setUserProgress(value.getState()));
            responseDtoList.add(challengeResponseDto);
        }
        return responseDtoList;
    }
    public List<ChallengeResponseDto> challengeIntoDto(List<Challenge> challengeList, List<ChallengeResponseDto> responseDtoList)
    {
        for (Challenge challenge : challengeList) {
            ChallengeResponseDto challengeResponseDto = new ChallengeResponseDto(challenge);
            for (int j = 0; j < challenge.getChallengeTagList().size(); j++) {
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
        for (Challenge challenge : challengeList) {
            ChallengeListResponseDto challengeListResponseDto = new ChallengeListResponseDto(challenge);
            for (int j = 0; j < challenge.getChallengeTagList().size(); j++) {
                Tag tag = challenge.getChallengeTagList().get(j).getTag();
                challengeListResponseDto.getHobbyList().add(new TagResponseDto(tag.getId(), tag.getTag()));
            }
            Optional<JoinedChallenge> joinedChallenge = joinedChallengeRepository.findByChallenge_idAndMember_id(
                    challenge.getId(), member_id
            );
            joinedChallenge.ifPresent(value -> challengeListResponseDto.setUserProgress(value.getState()));
            responseDtoList.add(challengeListResponseDto);
        }
        return responseDtoList;
    }
    public List<ChallengeListResponseDto> challengeIntoListDto(List<Challenge> challengeList, List<ChallengeListResponseDto> responseDtoList)
    {
        for (Challenge challenge : challengeList) {
            ChallengeListResponseDto challengeListResponseDto = new ChallengeListResponseDto(challenge);
            List<String> temp = new ArrayList<>();
            for (int j = 0; j < challenge.getChallengeTagList().size(); j++) {
                Tag tag = challenge.getChallengeTagList().get(j).getTag();
                challengeListResponseDto.getHobbyList().add(new TagResponseDto(tag.getId(), tag.getTag()));
            }
            responseDtoList.add(challengeListResponseDto);
        }
        return responseDtoList;
    }

    public void tagRegister(Long challenge_id, ChallengeRequestDto challengeData)
    {
        Challenge challenge = challengeRepository.findById(challenge_id).get();
        System.out.println(challenge.getId());
        List<TagRequestDto> tagList = challengeData.getHobbyList();
        if(tagList != null)
            for (TagRequestDto tagRequestDto : tagList) {
//            System.out.println("---------------------");
                String tag = tagRequestDto.getName();
                Tag tagEntity;
                // 태그 리스트 중에서 이미 태그가 존재한다면
                // 챌린지가 이미 취미로 집어넣은 태그인지 확인한다.
                if (tagRepository.existsByTag(tag))
                    tagEntity = tagRepository.getByTag(tag);
                    // 아예 처음 생기는 태그라면, 태그 테이블에 집어넣고
                    // 사용자 취미 태그 테이블에도 집어넣어 준다.
                else {
                    tagEntity = tagRepository.save(Tag.builder()
                            .tag(tag)
                            .build());
                }
//                System.out.println(tagEntity.getId() + " " + tagEntity.getTag());
//                challenge.getChallengeTagList().add
                challengeTagRepository.save(ChallengeTag.builder()
                        .challenge(challenge)
                        .tag(tagEntity)
                        .build());
            }
    }

    @Override
    public ChallengePageDto getChallengeContainingTag(String keyword, Pageable pageable, Long member_id){
        logger.debug("------------------서비스 로직 시작------------");
        List<ChallengeTag> challengeTagList = challengeTagService.getChallengeTagContainingTag(keyword);
        List<Long> ids = challengeTagList.stream().map(o -> o.getChallenge().getId()).collect(Collectors.toList());
        Page<Challenge> challengeList = challengeRepository.findByStateAndIdIn(1, ids, pageable);
        List<ChallengeListResponseDto> challengeListResponseDtoList = new ArrayList<>();
        challengeListResponseDtoList = challengeIntoListDto(challengeList.toList(), challengeListResponseDtoList, member_id);
        logger.debug("-------------------서비스 로직 종료-----------");
        ChallengePageDto challengePageDto = ChallengePageDto.builder()
                .content(challengeListResponseDtoList)
                .pageNum(challengeList.getNumber())
                .totalPages(challengeList.getTotalPages())
                .size(challengeList.getSize())
                .totalElements(challengeList.getTotalElements())
                .hasNext(challengeList.hasNext())
                .build();

        return challengePageDto;
    }
    @Override
    public ChallengePageDto getChallengeContainingTag(String keyword, Pageable pageable){
        logger.debug("------------------서비스 로직 시작------------");
        List<ChallengeTag> challengeTagList = challengeTagService.getChallengeTagContainingTag(keyword);
        List<Long> ids = challengeTagList.stream().map(o -> o.getChallenge().getId()).collect(Collectors.toList());
        Page<Challenge> challengeList = challengeRepository.findByStateAndIdIn(1, ids, pageable);
        List<ChallengeListResponseDto> challengeListResponseDtoList = new ArrayList<>();
        challengeListResponseDtoList = challengeIntoListDto(challengeList.toList(), challengeListResponseDtoList);
        logger.debug("-------------------서비스 로직 종료-----------");
        ChallengePageDto challengePageDto = ChallengePageDto.builder()
                .content(challengeListResponseDtoList)
                .pageNum(challengeList.getNumber())
                .totalPages(challengeList.getTotalPages())
                .size(challengeList.getSize())
                .totalElements(challengeList.getTotalElements())
                .hasNext(challengeList.hasNext())
                .build();

        return challengePageDto;
    }

    @Override
    public ChallengePageDto getMyChallenge(Long member_id, Pageable pageable) {
        Page<Challenge> list = challengeRepository.findByMember_idOrderByModifiedDate(member_id, pageable);
        List<Challenge> challengeList = list.toList();

        List<ChallengeListResponseDto> responseDtoList = new ArrayList<>();
        responseDtoList = challengeIntoListDto(challengeList, responseDtoList, member_id);
        ChallengePageDto challengePageDto = ChallengePageDto.builder()
                .pageNum(list.getNumber())
                .size(list.getSize())
                .content(responseDtoList)
                .hasNext(list.hasNext())
                .totalElements(list.getTotalElements())
                .totalPages(list.getTotalPages())
                .build();
        return challengePageDto;
    }

    @Override
    public void changeImg(Long challenge_id, String img) {
        Challenge challenge = challengeRepository.findById(challenge_id).get();
        challenge.imgUpdate(img);
    }

    @Override
    public ChallengePageDto getRecentChallenge(Long member_id, Pageable pageable) {
        Page<Challenge> challengeList = challengeRepository.findByStateOrderByCreatedDateDesc(1, pageable);
        if(challengeList.hasContent())
        {
            List<ChallengeListResponseDto> challengeListResponseDtoList = new ArrayList<>();
            challengeListResponseDtoList = challengeIntoListDto(challengeList.toList(), challengeListResponseDtoList,
                    member_id);
            // 전체 페이지 개수, 조회한 데이터, 현재 페이지 번호, 혀재 데이터의 사이즈, 전체 데이터 갯수
            ChallengePageDto challengePageDto = ChallengePageDto.builder()
                    .content(challengeListResponseDtoList)
                    .pageNum(challengeList.getNumber())
                    .totalPages(challengeList.getTotalPages())
                    .size(challengeList.getSize())
                    .totalElements(challengeList.getTotalElements())
                    .hasNext(challengeList.hasNext())
                    .build();

            return challengePageDto;
        }
        else return null;
    }

    @Override
    public ChallengePageDto getRecentChallenge(Pageable pageable) {
        Page<Challenge> challengeList = challengeRepository.findByStateOrderByCreatedDateDesc(1, pageable);
        if(challengeList.hasContent())
        {
            List<ChallengeListResponseDto> challengeListResponseDtoList = new ArrayList<>();
            challengeListResponseDtoList = challengeIntoListDto(challengeList.toList(), challengeListResponseDtoList);
            // 전체 페이지 개수, 조회한 데이터, 현재 페이지 번호, 혀재 데이터의 사이즈, 전체 데이터 갯수
            ChallengePageDto challengePageDto = ChallengePageDto.builder()
                    .content(challengeListResponseDtoList)
                    .pageNum(challengeList.getNumber())
                    .totalPages(challengeList.getTotalPages())
                    .size(challengeList.getSize())
                    .totalElements(challengeList.getTotalElements())
                    .hasNext(challengeList.hasNext())
                    .build();

            return challengePageDto;
        }
        else return null;
    }
}
