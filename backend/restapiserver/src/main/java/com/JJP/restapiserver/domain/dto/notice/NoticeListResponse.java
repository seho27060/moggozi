package com.JJP.restapiserver.domain.dto.notice;

public interface NoticeListResponse {
    Long getNoticeId();
    String getTitle();
    String getContent();
    String getCreatedDate();
    String getModifiedDate();
}
