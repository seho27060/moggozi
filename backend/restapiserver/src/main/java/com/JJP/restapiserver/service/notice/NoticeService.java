package com.JJP.restapiserver.service.notice;

import com.JJP.restapiserver.domain.dto.notice.NoticeListResponse;
import com.JJP.restapiserver.domain.dto.notice.NoticeRequest;
import com.JJP.restapiserver.domain.dto.notice.NoticeResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface NoticeService {
    ResponseEntity registerNotice(NoticeRequest noticeRequest, String username, String userRole);

    ResponseEntity getNoticeList(int page);

    ResponseEntity updateNotice(NoticeRequest noticeRequest, Long noticeId, String username, String userRole);

    ResponseEntity deleteNotice(Long noticeId, String username, String userRole);

    ResponseEntity getNotice(Long noticeId);

    List<NoticeListResponse> getAdminNoticeList();

    NoticeResponse getAdminNotice(Long noticeId);
}
