package com.JJP.restapiserver.repository.file;

import com.JJP.restapiserver.domain.entity.file.StageImg;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StageImgRepository extends JpaRepository<StageImg, Long> {

    List<StageImg> findByStage_id(Long stage_id);

}
