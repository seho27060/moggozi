package com.JJP.restapiserver.repository;

import com.JJP.restapiserver.domain.entity.stage.Stage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StageRepository extends JpaRepository<Stage, Long> {
}
