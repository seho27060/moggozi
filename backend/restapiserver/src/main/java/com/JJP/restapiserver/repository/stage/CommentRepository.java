package com.JJP.restapiserver.repository.stage;

import com.JJP.restapiserver.domain.entity.stage.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPost_id(Long post_id);
}
