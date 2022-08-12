package com.JJP.restapiserver.service.file;

import com.JJP.restapiserver.domain.dto.file.ImgDto;
import com.JJP.restapiserver.domain.dto.file.ImgRequestDto;
import com.JJP.restapiserver.domain.dto.file.StageImgRequestDto;
import com.JJP.restapiserver.domain.entity.file.StageImg;
import com.JJP.restapiserver.repository.file.StageImgRepository;
import com.JJP.restapiserver.repository.stage.StageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class StageImgServiceImpl implements StageImgService {


    private final StageRepository stageRepository;
    private final StageImgRepository stageImgRepository;

    @Override
    public List<StageImg> getStageImg(Long stage_id) {
        return stageImgRepository.findByStage_id(stage_id);
    }

    @Override
    public void saveStageImg(Long stage_id, ImgRequestDto stageImgRequestDto) {
        List<StageImg> stageImgList = stageImgRepository.findByStage_id(stage_id);
        for(StageImg stageImg : stageImgList){
            stageImgRepository.delete(stageImg);
        }
        List<ImgDto> imgDtoList = stageImgRequestDto.getImgDtoList();

        for(ImgDto imgDto : imgDtoList){
            stageImgRepository.save( StageImg.builder()
                    .stage(stageRepository.getById(stage_id))
                    .order_id(imgDto.getId())
                    .path(imgDto.getPath())
                    .build());
        }
    }


}
