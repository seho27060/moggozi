package com.JJP.restapiserver.controller.file;

import com.JJP.restapiserver.domain.dto.file.ImgRequestDto;
import com.JJP.restapiserver.domain.dto.file.StageImgRequestDto;
import com.JJP.restapiserver.service.file.StageImgService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//@CrossOrigin("*")
@Tag(name = "ImgController", description = "이미지 관련 API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/img")
public class ImgController {

    private final StageImgService imgService;

    @Operation(summary = "이미지업로드", description = "이미지 리스트를 보내주어야 함.")
    @PostMapping("/stage/{stage_id}")
    public ResponseEntity saveStageImg(@PathVariable Long stage_id, @RequestBody ImgRequestDto imgRequestDto){

        imgService.saveStageImg(stage_id, imgRequestDto);
        return new ResponseEntity(HttpStatus.OK);
    }

}
