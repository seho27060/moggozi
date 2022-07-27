package com.JJP.restapiserver.repository;

import com.JJP.restapiserver.domain.entity.stage.Stage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StageRepository extends JpaRepository<Stage, Long> {

    @Override
    Optional<Stage> findById(Long id);

    List<Stage> findAllByChallenge_id(Long challenge_id);
}
