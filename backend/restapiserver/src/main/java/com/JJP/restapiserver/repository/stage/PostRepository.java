package com.JJP.restapiserver.repository.stage;

import com.JJP.restapiserver.domain.entity.stage.Post;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findAllByMember_id(Long member_id);

    Page<Post> findAllByStage_idOrderByCreatedDateDesc(Long stage_id, Pageable pageable);

    Long countByMember_id(Long member_id);

    List<Post> findTop8ByMember_idOrderByModifiedDateDesc(Long member_id);

    @Query(value = "SELECT * FROM post order by RAND() LIMIT :size", nativeQuery = true)
    List<Post> findRandomPostList(@Param("size") int size);

    Slice<Post> findByMember_IdOrderByCreatedDateDesc(Long member_id, Pageable pageable);

    Post findByStage_idAndMember_Id(Long Stage_id, Long Member_id);

    Page<Post> findAllByOrderByCreatedDateDesc(Pageable pageable);

    Page<Post> findAllByOrderByLikeNumDesc(Pageable pageable);
}
