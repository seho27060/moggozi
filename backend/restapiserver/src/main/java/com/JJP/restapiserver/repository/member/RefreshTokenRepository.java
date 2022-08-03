package com.JJP.restapiserver.repository.member;

import com.JJP.restapiserver.domain.entity.member.Member;
import com.JJP.restapiserver.domain.entity.member.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    /**
     * Token이 unique 하기 때문에 Token으로 찾고자 하는 정보를 얻을 수 있다.
     * Token으로 찾는 경우, {id, member, token, expiryDate}에 대한 정보를 얻을 수 있다.
     */

    Optional<RefreshToken> findByToken(String token);

    /** 지우고자하는 Memer의 Token을 지울 수 있다. */
    @Modifying
    int deleteByMember(Member member);

}
