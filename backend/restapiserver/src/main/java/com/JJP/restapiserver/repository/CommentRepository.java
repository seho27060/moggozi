package com.JJP.restapiserver.repository;

import com.JJP.restapiserver.domain.entity.stage.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
