package com.JJP.restapiserver.service.admin;

import com.JJP.restapiserver.domain.dto.admin.MemberInfo;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AdminService {

    ResponseEntity<?> loginAdmin(String username, String password);
    ResponseEntity<?> getUserList(String username, String userRole, int pageNo);

    ResponseEntity<?> updateUserInfo(String username, String userRole, Long memberId);

    ResponseEntity<?>searchUser(String username, String userRole, String keyword);

    List<MemberInfo> getUsers();
}
