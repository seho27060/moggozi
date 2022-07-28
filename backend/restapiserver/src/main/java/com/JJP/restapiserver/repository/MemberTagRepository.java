package com.JJP.restapiserver.repository;

import com.JJP.restapiserver.domain.entity.hobby.MemberTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberTagRepository extends JpaRepository<MemberTag, Long> {
}
