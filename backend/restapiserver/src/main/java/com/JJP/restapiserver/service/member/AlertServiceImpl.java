package com.JJP.restapiserver.service.member;

import com.JJP.restapiserver.domain.dto.member.response.AlertResponseDto;
import com.JJP.restapiserver.domain.entity.member.Alert;
import com.JJP.restapiserver.repository.member.AlertRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Transactional
@Service
@RequiredArgsConstructor
public class AlertServiceImpl implements AlertService {

    private final AlertRepository alertRepository;

    @Override
    public List<AlertResponseDto> getRecentAlertList(Long member_id) {
        List<Alert> alertList = alertRepository.findTop6ByReceiver_idOrderByCreatedDateDesc(member_id);
        List<AlertResponseDto> alertResponseDtoList = new ArrayList<>();
        if(alertList != null){
            for(Alert alert : alertList){
                alertResponseDtoList.add(AlertResponseDto.builder()
                        .id(alert.getId())
                        .senderId(alert.getSender().getId())
                        .senderName(alert.getSender().getNickname())
                        .receiverId(alert.getReceiver().getId())
                        .receiverName(alert.getReceiver().getNickname())
                        .type(alert.getType())
                        .index(alert.getSequence())
                        .message(alert.getMessage())
                        .check(alert.getRead())
                        .createdTime(alert.getCreatedDate())
                        .build());
            }
        }
        return alertResponseDtoList;
    }


    @Override
    public void readAlert(Long alert_id) {
        Alert alert = alertRepository.getById(alert_id);
        alert.read();
    }

    @Override
    public void readAllAlert(Long member_id) {
        List<Alert> alertList = alertRepository.findByReceiver_id(member_id);
        for(Alert alert : alertList){
            if(alert.getRead() == 0)
                alert.read();
        }
    }

    @Override
    public List<AlertResponseDto> getAllAlertList(Long member_id) {
        List<Alert> alertList = alertRepository.findByReceiver_id(member_id);
        List<AlertResponseDto> alertResponseDtoList = new ArrayList<>();
        if(alertList != null){
            for(Alert alert : alertList){
                alertResponseDtoList.add(AlertResponseDto.builder()
                        .id(alert.getId())
                        .senderId(alert.getSender().getId())
                        .senderName(alert.getSender().getNickname())
                        .receiverId(alert.getReceiver().getId())
                        .receiverName(alert.getReceiver().getNickname())
                        .type(alert.getType())
                        .index(alert.getSequence())
                        .message(alert.getMessage())
                        .check(alert.getRead())
                        .createdTime(alert.getCreatedDate())
                        .build());
            }
        }
        return alertResponseDtoList;
    }
}
