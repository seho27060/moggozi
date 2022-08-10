package com.JJP.restapiserver.controller.admin;

import com.JJP.restapiserver.domain.dto.admin.AdminLoginRequest;
import com.JJP.restapiserver.service.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/")
    public String index(){
        return "index";
    }

    /** 관리자 로그인 */
    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(HttpSession session, @RequestBody AdminLoginRequest adminLoginRequest) {
        ResponseEntity responseEntity = adminService.loginAdmin(adminLoginRequest.getUsername(), adminLoginRequest.getPassword());
        if(responseEntity.getStatusCodeValue() == 200) {
            session.setAttribute("username", adminLoginRequest.getUsername());
            session.setAttribute("userRole", "ROLE_ADMIN");
        }
        return responseEntity;
    }

    /** 세션 확인 후 User 리스트 반환 */
    @GetMapping("/userList/{pageNo}")
    public ResponseEntity<?> userList(HttpSession session, @PathVariable("pageNo") int pageNo) {
        String username = (String) session.getAttribute("username");
        String userRole = (String) session.getAttribute("userRole");

        return adminService.getUserList(username, userRole, pageNo);
    }

    @GetMapping("/searchUser/{keyword}")
    public ResponseEntity<?> searchUser(HttpSession session, @PathVariable("keyword") String keyword) {
        String username = (String) session.getAttribute("username");
        String userRole = (String) session.getAttribute("userRole");

        return adminService.searchUser(username, userRole, keyword);
    }

    // Toggle 형식 - ROLE_USER -> ROLE_INVALIDATED_USER / ROLE_INVALIDATED_USER -> ROLE_USER
    @PostMapping("/update/{memberId}")
    public ResponseEntity<?> updateUser(HttpSession session, @PathVariable("memberId") Long memberId) {
        String username = (String) session.getAttribute("username");
        String userRole = (String) session.getAttribute("userRole");

        return adminService.updateUserInfo(username, userRole, memberId);
    }


/*    // Session이 제대로 저장되었는지 확인하기 위한 API
    @PostMapping("/session")
    public ResponseEntity<?> sessionCheck(HttpServletRequest request) {
        HttpSession session = request.getSession();
        System.out.println(session.getAttribute("userId"));
        System.out.println(session.getAttribute("userRole"));
        return null;
    }*/

/*    @GetMapping("/user")
    public String userManage(){
        return "userManage";
    }
    @GetMapping("/challenge")
    public String challengeManage(){
        return "challengeManage";
    }
    @GetMapping("/stage")
    public String stageManage(){
        return "stageManage";
    }

    @GetMapping("/post")
    public String postManage(){
        return "postManage";
    }

    @GetMapping("/comment")
    public String commentManage(){
        return "commentManage";
    }*/
}
