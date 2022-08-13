package com.JJP.restapiserver.service.notice;

import com.JJP.restapiserver.domain.dto.MessageResponse;
import com.JJP.restapiserver.domain.dto.notice.NoticeRequest;
import com.JJP.restapiserver.domain.dto.notice.NoticeResponse;
import com.JJP.restapiserver.domain.entity.member.ERole;
import com.JJP.restapiserver.domain.entity.notice.Notice;
import com.JJP.restapiserver.repository.member.MemberRepository;
import com.JJP.restapiserver.repository.member.RoleRepository;
import com.JJP.restapiserver.repository.notice.NoticeRepository;
import com.JJP.restapiserver.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {

    private final NoticeRepository noticeRepository;
    private final MemberRepository memberRepository;

    private final RoleRepository roleRepository;

    private final JwtUtils jwtUtils;
    public ResponseEntity registerNotice(NoticeRequest noticeRequest) {

//        String jwtToken = httpServletRequest.getHeader("Authorization");
//        Long memberId = jwtToken == null? null : jwtUtils.getUserIdFromJwtToken(jwtToken);
//
//        if(memberId == null
//                || memberRepository.findById(memberId).get().getRole().getName() != ERole.ROLE_ADMIN)
//            return ResponseEntity.badRequest().body("Error: Administrator can only write.");

        noticeRepository.save(Notice.builder().title(noticeRequest.getTitle()).content(noticeRequest.getContent())
                .build());

        return ResponseEntity.ok(new MessageResponse("Successfully registered"));
    }

    public ResponseEntity getNoticeList(int page) {
        return ResponseEntity.ok(noticeRepository.findAllByLatest(PageRequest.of(page, 10)));
    }

    public ResponseEntity updateNotice(NoticeRequest noticeRequest, Long noticeId) {

//        String jwtToken = httpServletRequest.getHeader("Authorization");
//        Long memberId = jwtToken == null? null : jwtUtils.getUserIdFromJwtToken(jwtToken);
//
//        if(memberId == null
//                || memberRepository.findById(memberId).get().getRole().getName() != ERole.ROLE_ADMIN)
//            return ResponseEntity.badRequest().body("Error: Administrator can only write.");

        Optional<Notice> notice = noticeRepository.findById(noticeId);

        if(notice.isPresent()) {
            noticeRepository.save(new Notice(noticeId, noticeRequest.getTitle(), noticeRequest.getContent()));
            return ResponseEntity.ok(new MessageResponse("Successfully updated."));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: failed to update."));
        }
    }

    public ResponseEntity deleteNotice(Long noticeId, HttpServletRequest httpServletRequest) {

        String jwtToken = httpServletRequest.getHeader("Authorization");
        Long memberId = jwtToken == null? null : jwtUtils.getUserIdFromJwtToken(jwtToken);

        if(memberId == null
                || memberRepository.findById(memberId).get().getRole().getName() != ERole.ROLE_ADMIN)
            return ResponseEntity.badRequest().body("Error: Administrator can only delete.");

        if(noticeRepository.findById(noticeId).isPresent()) {
            noticeRepository.deleteById(noticeId);
            return ResponseEntity.ok(new MessageResponse("Successfully deleted."));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: failed to delete."));
        }
    }

    public ResponseEntity getNotice(Long noticeId) {
        Optional<Notice> notice = noticeRepository.findById(noticeId);

        if(notice.isPresent()) {
            return ResponseEntity.ok(NoticeResponse.builder().noticeId(notice.get().getId())
                    .title(notice.get().getTitle())
                    .content(notice.get().getContent()).
                    createdDate(notice.get().createdDate.toString()).
                    updatedDate(notice.get().modifiedDate.toString()).build());
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: failed to load."));
        }
    }

}
