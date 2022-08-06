package com.JJP.restapiserver.repository.member;

import com.JJP.restapiserver.domain.dto.member.response.SearchMemberResponse;
import com.JJP.restapiserver.domain.entity.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByNickname(String nickname);
    // username(email)을 통한 사용자 조회
    Optional<Member> findByUsername(String username);

    // 존재하는 사용자인지를 알아내기 위해 - 이메일(username), 닉네임(nickname)
    Boolean existsByUsername(String username);

    Boolean existsByNickname(String nickname);

    // 사용자 정보 수정 - DB 변경 후 영속성에도 반영해줌
    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE Member m SET m.password = :password WHERE m.id = :id")
    int updatePasswordById(@Param("password") String password, @Param("id") Long id);

//    object references an unsaved transient instance - save the transient instance before flushing: com.JJP.restapiserver.domain.entity.member.Role
//    @Modifying(clearAutomatically = true)
//    @Query("update Member m set m.role = :role where m.id = :id")
//    int saveRoleById(@Param("role") Role role, @Param("id") Long id);


    @Query(value = "SELECT m.id as id, m.nickname as nickname, m.user_img as userImg FROM Member m WHERE m.nickname LIKE :nickname")
    List<SearchMemberResponse> findByKeyword(@Param("nickname") String nickname);
}
