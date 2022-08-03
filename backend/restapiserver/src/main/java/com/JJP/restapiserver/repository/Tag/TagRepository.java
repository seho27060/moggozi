package com.JJP.restapiserver.repository.Tag;

import com.JJP.restapiserver.domain.entity.Tag.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TagRepository extends JpaRepository<Tag, Long> {
    boolean existsByTag(String tag);

    Tag getByTag(String tag);

    // 태그 비슷한거 5개 가지고 오는 메소드
    List<Tag> findTop5ByTagContaining(String tag);
}
