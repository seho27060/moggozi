package com.JJP.restapiserver.domain.dto.notice;


import java.time.LocalDateTime;

public interface NoticeListResponse {
    Long getNoticeId();
    String getTitle();
    String getContent();
    LocalDateTime getCreatedDate();
    LocalDateTime getModifiedDate();
}
