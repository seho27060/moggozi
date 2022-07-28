package com.JJP.restapiserver.repository.Tag;

import com.JJP.restapiserver.domain.entity.Tag.MemberTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberTagRepository extends JpaRepository<MemberTag, Long> {
    boolean existsByMember_idAndTag(Long member_id, String Tag);
}
