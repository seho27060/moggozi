package com.JJP.restapiserver.repository.stage;

import com.JJP.restapiserver.domain.entity.stage.StageUser;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StageUserRepository extends JpaRepository<StageUser, Long> {
    Optional<StageUser> findByMember_idAndStage_id(Long member_id, Long stage_id);

    Long countByMember_id(Long member_id);

    List<StageUser> findTop8ByMember_idOrderByJoinTimeDesc(Long member_id);

    Slice<StageUser> findByMember_Id(Long member_id, Pageable pageable);
}
