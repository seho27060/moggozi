package com.JJP.restapiserver.controller.member;

import com.JJP.restapiserver.domain.dto.member.request.AlertRequestDto;
import com.JJP.restapiserver.domain.dto.member.response.AlertResponseDto;
import com.JJP.restapiserver.domain.entity.member.Alert;
import com.JJP.restapiserver.repository.member.AlertRepository;
import com.JJP.restapiserver.repository.member.MemberRepository;
import com.JJP.restapiserver.security.JwtUtils;
import com.JJP.restapiserver.service.member.AlertService;
import com.JJP.restapiserver.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

//@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/notification")
public class AlertController {

    private final AlertService alertService;

    private final MemberService memberService;

    private final MemberRepository memberRepository;

    private final AlertRepository alertRepository;

    private final JwtUtils jwtUtils;
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


    @Transactional
    @PostMapping("/register")
    public void alert(@RequestBody AlertRequestDto alertRequestDto)
    {
        Alert alert = Alert.builder()
                .type(alertRequestDto.getType())
                .receiver(memberRepository.getById(alertRequestDto.getReceiverId()))
                .sender(memberRepository.getById(alertRequestDto.getSenderId()))
                .is_read(0)
                .message(alertRequestDto.getMsg())
                .sequence(alertRequestDto.getIndex())
                .build();
        alertRepository.save(alert);
    }

}
