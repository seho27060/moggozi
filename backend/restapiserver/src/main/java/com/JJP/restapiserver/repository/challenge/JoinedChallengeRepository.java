package com.JJP.restapiserver.repository.challenge;

import com.JJP.restapiserver.domain.entity.challenge.JoinedChallenge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JoinedChallengeRepository extends JpaRepository<JoinedChallenge, Long> {

    Optional<JoinedChallenge> findByChallenge_idAndMember_id(Long challenge_id, Long member_id);

    // 8개 최근 참여한 순으로 챌린지 리스트 반환해주는 쿼리 메소드
    List<JoinedChallenge> findTop8ByMember_idOrderByModifiedDateDesc(Long member_id);
    // 내가 참여한 챌린지 개수 반환해주는 쿼리 메소드
    Long countByMember_id(Long member_id);
}
