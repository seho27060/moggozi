package com.JJP.restapiserver.repository.stage;

import com.JJP.restapiserver.domain.entity.stage.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {

    Optional<PostLike> findByPost_idAndMember_id(Long post_id, Long member_id);
}
