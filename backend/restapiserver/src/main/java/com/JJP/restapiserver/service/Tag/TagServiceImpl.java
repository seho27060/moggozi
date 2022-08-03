package com.JJP.restapiserver.service.Tag;

import com.JJP.restapiserver.domain.dto.tag.TagResponseDto;
import com.JJP.restapiserver.domain.entity.Tag.Tag;
import com.JJP.restapiserver.repository.Tag.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService{

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
