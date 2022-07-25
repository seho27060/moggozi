package com.JJP.restapiserver.repository;

import com.JJP.restapiserver.domain.entity.member.Member;
import com.JJP.restapiserver.domain.entity.member.RefreshToken;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    // Token이 unique 하기 때문에 Token으로 찾고자 하는 정보를 얻을 수 있다.
    Optional<RefreshToken> findByToken(String token);

    @Modifying
    int deleteByMember(Member member);

}
