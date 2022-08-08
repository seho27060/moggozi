package com.JJP.restapiserver.repository.stage;

import com.JJP.restapiserver.domain.entity.stage.Post;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    List<Post> findAllByMember_id(Long member_id);

    List<Post> findAllByStage_id(Long stage_id);

    Long countByMember_id(Long member_id);

    List<Post> findTop8ByMember_idOrderByModifiedDateDesc(Long member_id);

    // 랜덤으로 16개 포스트 보내줘라
    Page<Post> findAll(Pageable pageable);
}
