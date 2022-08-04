package com.JJP.restapiserver.repository.member;

import com.JJP.restapiserver.domain.dto.member.response.Followed;
import com.JJP.restapiserver.domain.dto.member.response.Following;
import com.JJP.restapiserver.domain.entity.member.Follow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FollowRepository extends JpaRepository<Follow, Long> {

    // 대상을 팔로우 하는 사람들에 관한 리스트 (리스트 유저를 로그인한 유저가 팔로우하는지 상태 표시)
    @Query(value = "SELECT m.member_id as id, m.nickname as nickname, m.user_img as UserImg, " +
            "CASE WHEN m.member_id IN " +
            "(SELECT to_member_id from follow where to_member_id = :loginId) THEN 1 ELSE 0 " +
            "END AS loginFollowState FROM member m INNER JOIN " +
            "(SELECT * FROM follow WHERE follow.to_member_id = :toMemberId) f ON m.member_id = f.from_member_id", nativeQuery = true)
    List<Followed> findAllByTo_member(@Param("toMemberId") Long toMemberId, @Param("loginId") Long loginId);


    // 대상이 팔로우 하는 사람들에 관한 리스트
    @Query(value = "SELECT m.member_id as id, m.nickname as nickname, m.user_img as UserImg FROM MEMBER m INNER JOIN " +
            "(SELECT * FROM follow " +
            "WHERE follow.from_member_id = :fromMemberId) f " +
            "ON m.member_id = f.to_member_id", nativeQuery = true)
    List<Following> findAllByFrom_member(@Param("fromMemberId") Long fromMemberId);

    // 본인이 팔로우 하는 사람의 수
    @Query(value = "SELECT COUNT(f) FROM Follow f " +
            "WHERE f.from_member.id = :fromMemberId")
    int countByFollowing(@Param("fromMemberId") Long fromMemberId);

    // 본인을 팔로우 하는 사람의 수 - count
    @Query(value = "SELECT COUNT(f) FROM Follow f WHERE f.to_member.id = :toMemberId")
    int countByFollower(@Param("toMemberId") Long toMemberId);

    // 언팔로우
    @Modifying
    @Query(value = "DELETE FROM follow WHERE from_member_id = :fromMemberId AND to_member_id = :toMemberId", nativeQuery = true)
    int deleteByFrom_memberAndTo_member(@Param("fromMemberId") Long fromMemberId, @Param("toMemberId") Long toMemberId);
}
