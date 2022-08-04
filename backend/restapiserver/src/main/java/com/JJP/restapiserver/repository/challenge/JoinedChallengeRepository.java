package com.JJP.restapiserver.repository.challenge;

import com.JJP.restapiserver.domain.entity.challenge.JoinedChallenge;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JoinedChallengeRepository extends JpaRepository<JoinedChallenge, Long> {

    Optional<JoinedChallenge> findByChallenge_idAndMember_id(Long challenge_id, Long user_id);

//    List<JoinedChallenge> findTopByChallenge_idAndMember_idOrderByModified_DateDesc();
}
