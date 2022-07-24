package com.JJP.restapiserver.repository;

import com.JJP.restapiserver.domain.entity.stage.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {

}
