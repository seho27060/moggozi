package com.JJP.restapiserver.service.Tag;

import com.JJP.restapiserver.domain.dto.tag.TagResponseDto;
import com.JJP.restapiserver.domain.entity.Tag.Tag;
import com.JJP.restapiserver.repository.Tag.TagRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService{

    private Logger logger = LoggerFactory.getLogger(TagServiceImpl.class);
    private final TagRepository tagRepository;

    @Override
    public TagResponseDto saveTag(String tagContent){
        Tag tag = Tag.builder()
                .tag(tagContent).
                build();
        Tag result = tagRepository.save(tag);
        return new TagResponseDto(result.getId(), result.getTag());
    }

    @Override
    public boolean existsByTag(String keyword) {
        return tagRepository.existsByTag(keyword);
    }

    @Override
    public TagResponseDto getTagByName(String keyword) {
        Tag tag = tagRepository.getByTag(keyword);
        return new TagResponseDto(tag.getId(), tag.getTag());
    }

    @Override
    public List<TagResponseDto> findTagContaining(String keyword) {
        List<Tag> tagList = tagRepository.findByTagContaining(keyword);
        List<TagResponseDto> tagResponseDtoList = tagList.stream().map(
                o -> new TagResponseDto(o.getId(), o.getTag())).collect(Collectors.toList());
        logger.debug("--------------태그 찾기---------");
        logger.debug(tagList.toString());
        logger.debug("--------------태그 찾기 종료---------");
        return tagResponseDtoList;
    }

    @Override
    public ResponseEntity autoCompletion(String keyword) {

        List<Tag> tagList = tagRepository.findTop5ByTagContaining(keyword);
        List<TagResponseDto> tagResponseDtoList = new ArrayList<>();
        for(int i = 0; i < tagList.size(); i++){
            Tag tag = tagList.get(i);
            TagResponseDto tagResponseDto = new TagResponseDto(tag.getId(), tag.getTag());
            tagResponseDtoList.add(tagResponseDto);
        }
        return new ResponseEntity(tagResponseDtoList, HttpStatus.OK);
    }


}
