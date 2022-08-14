package com.JJP.restapiserver.service.member;

import com.JJP.restapiserver.domain.dto.member.response.AlertResponseDto;

import java.util.List;

public interface AlertService {
    List<AlertResponseDto> getRecentAlertList(Long member_id);
    void readAlert(Long alert_id);
    void readAllAlert(Long member_id);
    List<AlertResponseDto> getAllAlertList(Long member_id);

    AlertResponseDto saveAlert(Long senderId, Long receiverId, String type, Long index, String msg);

}
