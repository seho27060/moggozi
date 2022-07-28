package com.JJP.restapiserver.service.stage;

import com.JJP.restapiserver.domain.dto.PostLikeRequestDto;
import org.springframework.http.ResponseEntity;

public interface PostLikeService {
    ResponseEntity like(PostLikeRequestDto postLikeRequestDto);
    ResponseEntity unlike(PostLikeRequestDto postLikeRequestDto);
}
