package com.JJP.restapiserver.repository.challenge;

import com.JJP.restapiserver.domain.entity.challenge.Challenge;
import com.JJP.restapiserver.domain.entity.challenge.JoinedChallenge;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JoinedChallengeRepository extends JpaRepository<JoinedChallenge, Long> {

    Optional<JoinedChallenge> findByChallenge_idAndMember_id(Long challenge_id, Long member_id);

    // 8개 최근 참여한 순으로 챌린지 리스트 반환해주는 쿼리 메소드
    List<JoinedChallenge> findTop8ByMember_idOrderByModifiedDateDesc(Long member_id);
    // 내가 참여한 챌린지 개수 반환해주는 쿼리 메소드
    Long countByMember_id(Long member_id);


    // 가장 최근에 생성된 시간순으로 해당 멤버가 "참여한 챌린지" 리스트를 반환해줌.
    // 참여한 챌린지 -> 챌린지
    // 가장 최근에 생성된 시간순으로 해당 멤버가 참여한 "챌린지" 리스트를 반환해줌.
    Slice<JoinedChallenge> findByMember_idOrderByCreatedDateDesc(Long member_id, Pageable pageable);

    List<JoinedChallenge> findByMember_id(Long member_id);


}
