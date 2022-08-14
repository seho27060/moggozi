package com.JJP.restapiserver.service.Tag;

import com.JJP.restapiserver.domain.dto.tag.TagResponseDto;
import com.JJP.restapiserver.domain.entity.Tag.ChallengeTag;
import com.JJP.restapiserver.repository.Tag.ChallengeTagRepository;
import com.JJP.restapiserver.repository.Tag.TagRepository;
import com.JJP.restapiserver.service.challenge.ChallengeServiceImpl;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Getter
@Setter
@RequiredArgsConstructor
public class ChallengeTagServiceImpl implements ChallengeTagService {

    private Logger logger = LoggerFactory.getLogger(ChallengeServiceImpl.class);
    private final ChallengeTagRepository challengeTagRepository;
    private final TagService tagService;

    @Override
    public List<ChallengeTag> getChallengeTagContainingTag(String tag) {
        logger.debug("---------챌린지 태그 서비스 시작------------");
        List<TagResponseDto> tagResponseDtoList = tagService.findTagContaining(tag);
        List<Long> ids = tagResponseDtoList.stream().map(o->o.getId()).collect(Collectors.toList());
        logger.debug(ids.toString());

        logger.debug("------------챌린지 태그 찾기----------");
        List<ChallengeTag> challengeTagList = challengeTagRepository.findByTag_idIn(ids);
        logger.debug(challengeTagList.toString());
        logger.debug("---------챌린지 태그 서비스 종료------------");
        return challengeTagList;
    }
}
