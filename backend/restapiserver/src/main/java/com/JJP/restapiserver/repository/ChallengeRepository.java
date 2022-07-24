package com.JJP.restapiserver.repository;

import com.JJP.restapiserver.domain.entity.challenge.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
}
