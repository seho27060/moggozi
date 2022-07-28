package com.JJP.restapiserver.repository;

import com.JJP.restapiserver.domain.entity.stage.Stage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StageRepository extends JpaRepository<Stage, Long> {

    List<Stage> findAllByChallenge_id(Long challenge_id);
}