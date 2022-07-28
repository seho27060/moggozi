package com.JJP.restapiserver.repository.Tag;

import com.JJP.restapiserver.domain.entity.Tag.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {
    boolean existsByTag(String tag);
}
