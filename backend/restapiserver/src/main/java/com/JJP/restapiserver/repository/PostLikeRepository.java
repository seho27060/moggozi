package com.JJP.restapiserver.repository;

import com.JJP.restapiserver.domain.entity.stage.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {
}
