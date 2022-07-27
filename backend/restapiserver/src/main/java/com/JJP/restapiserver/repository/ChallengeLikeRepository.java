package com.JJP.restapiserver.repository;

import com.JJP.restapiserver.domain.entity.challenge.ChallengeLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChallengeLikeRepository extends JpaRepository<ChallengeLike, Long> {
    Optional<ChallengeLike> findByMember_idAndChallenge_id(Long member_id, Long challenge_id);

}
