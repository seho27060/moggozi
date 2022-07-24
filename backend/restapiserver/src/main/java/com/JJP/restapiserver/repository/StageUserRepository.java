package com.JJP.restapiserver.repository;

import com.JJP.restapiserver.domain.entity.stage.StageUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StageUserRepository extends JpaRepository<StageUser, Long> {
}
