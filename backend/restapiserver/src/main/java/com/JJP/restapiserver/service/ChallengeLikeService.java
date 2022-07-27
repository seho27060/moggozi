package com.JJP.restapiserver.service;

import com.JJP.restapiserver.domain.dto.ChallengeLikeRequestDto;
import org.springframework.http.ResponseEntity;

public interface ChallengeLikeService {
    public ResponseEntity like(ChallengeLikeRequestDto challengeLikeRequestDto);
    public ResponseEntity unlike(ChallengeLikeRequestDto challengeLikeRequestDto);
}
