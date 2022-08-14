package com.JJP.restapiserver.service.post;

import com.JJP.restapiserver.domain.dto.stage.PostLikeRequestDto;
import org.springframework.http.ResponseEntity;

public interface PostLikeService {
    ResponseEntity like(PostLikeRequestDto postLikeRequestDto, Long member_id);
}
