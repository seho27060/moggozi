package com.JJP.restapiserver.controller.notice;

import com.JJP.restapiserver.domain.dto.notice.NoticeRequest;
import com.JJP.restapiserver.service.notice.NoticeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@Tag(name = "NoticeController", description = "공지사항(Notice) API")
@RequiredArgsConstructor
@RestController
@RequestMapping("/notice")
public class NoticeController {

    private final NoticeService noticeService;

    @Operation(summary = "공지사항 등록", description = "username과 password를 이용하여 로그인 하여 발행된 토큰을 검사하여 권한이 관리자일 경우에만 글을 등록할 수 있습니다.")
    @PostMapping("/register")
    private ResponseEntity registerNotice(NoticeRequest noticeRequest, HttpServletRequest httpServletRequest) {
        return noticeService.registerNotice(noticeRequest, httpServletRequest);
    }

    @Operation(summary = "공지사항 등록", description = "수정하고자하는 글의 번호를 {noticeId}에 넣어주세요~" +
            "username과 password를 이용하여 로그인 하여 발행된 토큰을 검사하여 권한이 관리자일 경우에만 글을 수정할 수 있습니다.")
    @PostMapping("/update/{noticeId}")
    private ResponseEntity updateNotice(NoticeRequest noticeRequest, @PathVariable("noticeId") Long noticeId, HttpServletRequest httpServletRequest){
        return noticeService.updateNotice(noticeRequest, noticeId, httpServletRequest);
    }

    @Operation(summary = "공지사항 상세보기", description = "{noticeId}의 자세한 내용을 반환합니다(상세보기). ")
    @GetMapping("/{noticeId}")
    private ResponseEntity getNotice(@PathVariable("noticeId") Long noticeId) {
        return noticeService.getNotice(noticeId);
    }

    @Operation(summary = "공지사항 삭제", description = "{noticeId}를 통해 공지사항을 지울 수 있습니다. 단, 관리자만 삭제 가능합니다.")
    @PostMapping("/delete/{noticeId}")
    private ResponseEntity deleteNotice(@PathVariable("noticeId") Long noticeId, HttpServletRequest httpServletRequest) {
        return noticeService.deleteNotice(noticeId, httpServletRequest);
    }

    @Operation(summary = "공지사항 리스트", description = "1 페이지를 확인하고자하는 경우 {page}에 0을 넣어주세요!" +
            "페이지 번호는 0부터 시작합니다. 그리고 10개의 게시글을 반환합니다. ")
    @GetMapping("/list/{page}")
    private ResponseEntity getNoticeList(@PathVariable int page) {
        return noticeService.getNoticeList(page);
    }
}
