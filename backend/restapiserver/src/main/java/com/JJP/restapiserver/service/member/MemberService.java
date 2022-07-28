package com.JJP.restapiserver.service.member;

import com.JJP.restapiserver.domain.dto.member.request.LoginRequest;
import com.JJP.restapiserver.domain.dto.member.request.SignupRequest;
import com.JJP.restapiserver.domain.dto.member.request.UpdateUserRequest;
import org.springframework.http.ResponseEntity;

public interface MemberService {

    public ResponseEntity<?> register(SignupRequest signupRequest); // 회원등록
    public ResponseEntity<?> delete(Long user_id); // 회원탈퇴
    public ResponseEntity<?> update(Long user_id, UpdateUserRequest updateUserRequest); // 회원정보수정
    public ResponseEntity<?> updatePassword(LoginRequest loginRequest); // 패스워드 업데이트
    public ResponseEntity<?> checkValidity(LoginRequest loginRequest); // 사용자 확인

    public ResponseEntity<?> login(LoginRequest loginRequest); // 로그인

    ResponseEntity<?> findUser(Long user_id); // 사용자 상세정보

}
