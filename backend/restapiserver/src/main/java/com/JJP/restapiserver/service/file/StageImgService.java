package com.JJP.restapiserver.service.file;

import com.JJP.restapiserver.domain.dto.file.ImgRequestDto;
import com.JJP.restapiserver.domain.dto.file.StageImgRequestDto;
import com.JJP.restapiserver.domain.entity.file.StageImg;

import java.util.List;

public interface StageImgService {
    List<StageImg> getStageImg(Long stage_id);

    void saveStageImg(Long stage_id, ImgRequestDto stageImgRequestDto);


}
