package com.JJP.restapiserver.repository;

import com.JJP.restapiserver.domain.entity.hobby.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {
}
