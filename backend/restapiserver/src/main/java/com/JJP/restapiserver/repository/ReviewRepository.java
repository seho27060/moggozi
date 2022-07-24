package com.JJP.restapiserver.repository;

import com.JJP.restapiserver.domain.entity.challenge.Review;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReviewRepository extends JpaRepository<Review, Long> {
}
