package com.JJP.restapiserver.repository.notice;

import com.JJP.restapiserver.domain.dto.notice.NoticeListResponse;
import com.JJP.restapiserver.domain.entity.notice.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
    Optional<Notice> findByTitle(String title);

    @Query("SELECT n.id AS noticeId, n.title AS title, n.content AS content, n.createdDate AS createdDate" +
            ", n.modifiedDate AS modifiedDate FROM Notice n ORDER BY n.modifiedDate DESC")
    Page<NoticeListResponse> findAllByLatest(Pageable pageable);
}
