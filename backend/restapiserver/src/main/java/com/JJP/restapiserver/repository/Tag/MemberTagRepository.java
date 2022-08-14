package com.JJP.restapiserver.repository.Tag;

import com.JJP.restapiserver.domain.entity.Tag.MemberTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberTagRepository extends JpaRepository<MemberTag, Long> {
    List<MemberTag> findTop5ByMember_idOrderByCreatedDateDesc(Long member_id);

    boolean existsByMember_idAndTag(Long member_id, String Tag);
}
