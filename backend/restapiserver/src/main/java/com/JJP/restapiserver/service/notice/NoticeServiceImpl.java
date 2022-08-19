package com.JJP.restapiserver.service.notice;

import com.JJP.restapiserver.domain.dto.MessageResponse;
import com.JJP.restapiserver.domain.dto.notice.NoticeListResponse;
import com.JJP.restapiserver.domain.dto.notice.NoticeRequest;
import com.JJP.restapiserver.domain.dto.notice.NoticeResponse;
import com.JJP.restapiserver.domain.entity.member.Member;
import com.JJP.restapiserver.domain.entity.notice.Notice;
import com.JJP.restapiserver.repository.member.MemberRepository;
import com.JJP.restapiserver.repository.member.RoleRepository;
import com.JJP.restapiserver.repository.notice.NoticeRepository;
import com.JJP.restapiserver.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class NoticeServiceImpl implements NoticeService {

    private final NoticeRepository noticeRepository;
    private final MemberRepository memberRepository;

    private final RoleRepository roleRepository;

    private final JwtUtils jwtUtils;

    public ResponseEntity registerNotice(NoticeRequest noticeRequest, String username, String userRole) {
        // 존재하는 유저인지 먼저 확인한 뒤, 주어진 역할이 Admin인지를 확인한다. Admin이 아닐 경우 글을 등록할 수 없다.
        if(!isAdmin(username, userRole))
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Administrator can only register."));

        noticeRepository.save(Notice.builder().title(noticeRequest.getTitle()).content(noticeRequest.getContent())
                .build());

        return ResponseEntity.ok(new MessageResponse("Successfully registered"));
    }

    public ResponseEntity getNoticeList(int page) {
        return ResponseEntity.ok(noticeRepository.findAllByLatest(PageRequest.of(page, 10)));
    }

    public ResponseEntity updateNotice(NoticeRequest noticeRequest, Long noticeId, String username, String userRole) {
        // 존재하는 유저인지 먼저 확인한 뒤, 주어진 역할이 Admin인지를 확인한다. Admin이 아닐 경우 글을 수정할 수 없다.
        if(!isAdmin(username, userRole))
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Administrator can only delete."));

        Optional<Notice> notice = noticeRepository.findById(noticeId);

        if (notice.isPresent()) {
            noticeRepository.save(new Notice(noticeId, noticeRequest.getTitle(), noticeRequest.getContent()));
            return ResponseEntity.ok(new MessageResponse("Successfully updated."));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: failed to update."));
        }
    }

    public ResponseEntity deleteNotice(Long noticeId, String username, String userRole) {
        // 존재하는 유저인지 먼저 확인한 뒤, 주어진 역할이 Admin인지를 확인한다. Admin이 아닐 경우 글을 삭제할 수 없다.
        if(!isAdmin(username, userRole))
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Administrator can only delete."));

        if (noticeRepository.findById(noticeId).isPresent()) {
            noticeRepository.deleteById(noticeId);
            return ResponseEntity.ok(new MessageResponse("Successfully deleted."));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: failed to delete."));
        }
    }

    public ResponseEntity getNotice(Long noticeId) {
        Optional<Notice> notice = noticeRepository.findById(noticeId);

        if (notice.isPresent()) {
            return ResponseEntity.ok(NoticeResponse.builder().noticeId(notice.get().getId())
                    .title(notice.get().getTitle())
                    .content(notice.get().getContent()).
                    createdDate(notice.get().createdDate.toString()).
                    updatedDate(notice.get().modifiedDate.toString()).build());
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: failed to load."));
        }
    }


    // pagination을 적용하지 않은 리스트 찾기 - 관리자 페이지
    @Override
    public List<NoticeListResponse> getAdminNoticeList() {
        return noticeRepository.findListByLatest();
    }

    @Override
    public NoticeResponse getAdminNotice(Long noticeId) {
        Optional<Notice> notice = noticeRepository.findById(noticeId);
        if(notice.isPresent()) {
            return NoticeResponse.builder().noticeId(notice.get().getId())
                    .title(notice.get().getTitle())
                    .content(notice.get().getContent()).build();
        }
        return null;
    }

    private boolean isAdmin(String username, String userRole) {
        Optional<Member> member = memberRepository.findByUsername(username);
        if (member.isPresent()) {
            if (member.get().getRole().getName().toString().equals(userRole)) {
                return true;
            }
        }
        return false;
    }

}
