package com.JJP.restapiserver.service.challenge;

import com.JJP.restapiserver.domain.dto.challenge.ChallengeLikeRequestDto;
import org.springframework.http.ResponseEntity;

public interface ChallengeLikeService {
    public ResponseEntity like(ChallengeLikeRequestDto challengeLikeRequestDto);
}
