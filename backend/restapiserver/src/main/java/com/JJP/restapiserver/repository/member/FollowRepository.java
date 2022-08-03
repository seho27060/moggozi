package com.JJP.restapiserver.repository.member;

import com.JJP.restapiserver.domain.entity.member.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    @Modifying
    @Query(value = "delete from follow where from_member_id = :fromMemberId and to_member_id = :toMemberId", nativeQuery = true)
    int deleteByFrom_memberAndTo_member(@Param("fromMemberId") Long fromMemberId, @Param("toMemberId") Long toMemberId);
}
