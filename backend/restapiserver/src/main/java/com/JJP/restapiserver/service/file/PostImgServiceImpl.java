package com.JJP.restapiserver.service.file;

import com.JJP.restapiserver.domain.dto.file.ImgDto;
import com.JJP.restapiserver.domain.dto.file.ImgRequestDto;
import com.JJP.restapiserver.domain.entity.file.PostImg;
import com.JJP.restapiserver.domain.entity.file.StageImg;
import com.JJP.restapiserver.repository.file.PostImgRepository;
import com.JJP.restapiserver.repository.file.StageImgRepository;
import com.JJP.restapiserver.repository.stage.PostRepository;
import com.JJP.restapiserver.repository.stage.StageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PostImgServiceImpl implements PostImgService {

    private final PostRepository postRepository;
    private final PostImgRepository postImgRepository;

    @Override
    public List<PostImg> getPostImg(Long post_id) {
        return postImgRepository.findByPost_id(post_id);
    }

    @Override
    public void savePostImg(Long post_id, ImgRequestDto postImgRequestDto) {
        List<PostImg> postImgList = postImgRepository.findByPost_id(post_id);
        for(PostImg postImg : postImgList){
            postImgRepository.delete(postImg);
        }
        List<ImgDto> imgDtoList = postImgRequestDto.getImgDtoList();

        for(ImgDto imgDto : imgDtoList){
            postImgRepository.save( PostImg.builder()
                    .post(postRepository.getById(post_id))
                    .order_id(imgDto.getOrder())
                    .path(imgDto.getPath())
                    .build());
        }
    }
}
