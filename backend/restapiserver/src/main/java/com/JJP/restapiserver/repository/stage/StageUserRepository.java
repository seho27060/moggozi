package com.JJP.restapiserver.repository.stage;

import com.JJP.restapiserver.domain.entity.stage.StageUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StageUserRepository extends JpaRepository<StageUser, Long> {
    Optional<StageUser> findByMember_idAndStage_id(Long member_id, Long stage_id);
}
