package com.JJP.restapiserver.service.notice;

import com.JJP.restapiserver.domain.dto.notice.NoticeRequest;
import org.springframework.http.ResponseEntity;

import javax.servlet.http.HttpServletRequest;

public interface NoticeService {
    ResponseEntity registerNotice(NoticeRequest noticeRequest);

    ResponseEntity getNoticeList(int page);

    ResponseEntity updateNotice(NoticeRequest noticeRequest, Long noticeId);

    ResponseEntity deleteNotice(Long noticeId, HttpServletRequest httpServletRequest);

    ResponseEntity getNotice(Long noticeId);
}
