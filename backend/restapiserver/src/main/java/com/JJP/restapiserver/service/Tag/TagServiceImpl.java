package com.JJP.restapiserver.service.Tag;

import com.JJP.restapiserver.domain.entity.Tag.Tag;
import com.JJP.restapiserver.repository.Tag.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService{

    private final TagRepository tagRepository;

    public void saveTag(String tagContent){
        Tag tag = Tag.builder()
                .tag(tagContent).
                build();
        tagRepository.save(tag);
    }
}
