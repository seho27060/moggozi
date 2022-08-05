package com.JJP.restapiserver.controller.member;

import com.JJP.restapiserver.domain.dto.member.response.AlertResponseDto;
import com.JJP.restapiserver.security.JwtUtils;
import com.JJP.restapiserver.service.member.AlertService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notification")
public class AlertController {

    private AlertService alertService;

    private JwtUtils jwtUtils;
    @GetMapping("/recent")
    public ResponseEntity getRecentAlerts(HttpServletRequest request){
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
        List<AlertResponseDto> alertResponseDtoList = alertService.getRecentAlertList(member_id);

        return new ResponseEntity(alertResponseDtoList, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity getAllAlerts(HttpServletRequest request){
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
        List<AlertResponseDto> alertResponseDtoList = alertService.getAllAlertList(member_id);

        return new ResponseEntity(alertResponseDtoList, HttpStatus.OK);
    }

    @PutMapping("/{alert_id}")
    public void readAlert(@PathVariable Long alert_id){
        alertService.readAlert(alert_id);
    }

    @PutMapping("/readAll")
    public void readAllAlert(HttpServletRequest request){
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
        alertService.readAllAlert(member_id);
    }


}
