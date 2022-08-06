package com.JJP.restapiserver.repository.file;

import com.JJP.restapiserver.domain.entity.file.Image;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FileRepository extends JpaRepository<Image, Long> {
    Optional<Image> findByPath(String path);

}
