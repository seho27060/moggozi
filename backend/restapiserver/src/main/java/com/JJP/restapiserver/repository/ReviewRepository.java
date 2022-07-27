package com.JJP.restapiserver.repository;

import com.JJP.restapiserver.domain.entity.challenge.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findAllByChallenge_id(Long challenge_id);
}
