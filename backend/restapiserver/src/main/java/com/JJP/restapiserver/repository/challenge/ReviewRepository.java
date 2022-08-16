package com.JJP.restapiserver.repository.challenge;

import com.JJP.restapiserver.domain.entity.challenge.Review;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Optional<Review> findByMember_idAndChallenge_id(Long member_id, Long challenge_id);
    Slice<Review> findAllByChallenge_id(Long challenge_id, Pageable pageable);
}
