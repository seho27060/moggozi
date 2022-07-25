package com.JJP.restapiserver.repository;

import com.JJP.restapiserver.domain.entity.challenge.JoinedChallenge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JoinedChallengeRepository extends JpaRepository<JoinedChallenge, Long> {

}
