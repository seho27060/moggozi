package com.JJP.restapiserver.repository.stage;

import com.JJP.restapiserver.domain.entity.stage.Post;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findAllByMember_id(Long member_id);

    List<Post> findAllByStage_id(Long stage_id);

    Long countByMember_id(Long member_id);

    List<Post> findTop8ByMember_idOrderByModifiedDateDesc(Long member_id);

    @Query(value = "SELECT * FROM post order by RAND() LIMIT :size", nativeQuery = true)
    List<Post> findRandomPostList(@Param("size") int size);
}
