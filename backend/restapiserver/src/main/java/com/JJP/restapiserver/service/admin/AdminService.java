package com.JJP.restapiserver.service.admin;

import org.springframework.http.ResponseEntity;

public interface AdminService {

    ResponseEntity<?> loginAdmin(String username, String password);
    ResponseEntity<?> getUserList(String username, String userRole, int pageNo);

    ResponseEntity<?> updateUserInfo(String username, String userRole, Long memberId);

    ResponseEntity<?>searchUser(String username, String userRole, String keyword);
}
