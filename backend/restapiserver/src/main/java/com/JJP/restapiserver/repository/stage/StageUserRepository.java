package com.JJP.restapiserver.repository.stage;

import com.JJP.restapiserver.domain.entity.stage.StageUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StageUserRepository extends JpaRepository<StageUser, Long> {
}
