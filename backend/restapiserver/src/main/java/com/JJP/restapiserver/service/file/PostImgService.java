package com.JJP.restapiserver.service.file;

import com.JJP.restapiserver.domain.dto.file.ImgRequestDto;
import com.JJP.restapiserver.domain.entity.file.PostImg;
import com.JJP.restapiserver.domain.entity.file.StageImg;

import java.util.List;

public interface PostImgService {
    List<PostImg> getPostImg(Long post_id);

    void savePostImg(Long Post_id, ImgRequestDto postImgRequestDto);


}
