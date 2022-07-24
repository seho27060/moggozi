package com.JJP.restapiserver.repository;

import com.JJP.restapiserver.domain.entity.challenge.ChallengeLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeLikeRepository extends JpaRepository<ChallengeLike, Long> {
}
