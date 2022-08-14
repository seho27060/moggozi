package com.JJP.restapiserver.web;

import com.JJP.restapiserver.domain.entity.member.ERole;
import com.JJP.restapiserver.service.admin.AdminService;
import com.JJP.restapiserver.service.notice.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import javax.servlet.http.HttpSession;

@RequiredArgsConstructor
@Controller
public class IndexController {

    private final HttpSession httpSession;
    private final NoticeService noticeService;
    private final AdminService adminService;


    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/member")
    public String member(Model model) {
        if (isAdmin()) {
            model.addAttribute("users", adminService.getUsers());
            System.out.println(adminService.getUsers().toString());
            return "member";
        } else {
            model.addAttribute("msg", "로그인이 필요합니다.");
            return "index";
        }
    }

    @GetMapping("/admin_notice")
    public String getNotice(Model model) {
        if (isAdmin()) {
            model.addAttribute("notices", noticeService.getAdminNoticeList());
            return "notice";
        } else {
            model.addAttribute("msg", "로그인이 필요합니다.");
            return "index";
        }
    }

    @GetMapping("/noticeRegister")
    public String noticeSave(Model model) {
        if (isAdmin()) {
            return "noticeRegister";
        } else {
            model.addAttribute("msg", "로그인이 필요합니다.");
            return "index";
        }
    }

    @GetMapping("/noticeUpdate/{noticeId}")
    public String noticeUpdate(Model model, @PathVariable("noticeId") Long noticeId) {
        if(isAdmin()) {
            model.addAttribute("noticeId", noticeId);
            model.addAttribute("notice", noticeService.getAdminNotice(noticeId));
            return "noticeUpdate";
        } else {
            model.addAttribute("msg", "로그인이 필요합니다.");
            return "index";
        }
    }

    private boolean isAdmin() {
        try {
            String role = httpSession.getAttribute("userRole").toString();
            if (role.equals(ERole.ROLE_ADMIN.toString())) {
                return true;
            }
        } catch (Exception e) {
            return false;
        }
        return false;
    }

}
