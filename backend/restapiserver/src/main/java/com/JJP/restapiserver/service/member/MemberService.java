package com.JJP.restapiserver.service.member;

import com.JJP.restapiserver.domain.dto.member.request.*;
import com.JJP.restapiserver.domain.dto.member.response.ProfileResponse;
import org.springframework.http.ResponseEntity;

public interface MemberService {

    ResponseEntity<?> register(SignupRequest signupRequest); // 회원등록
    ResponseEntity<?> delete(String password, Long user_id); // 회원탈퇴
    ResponseEntity<?> update(Long user_id, UpdateUserRequest updateUserRequest); // 회원정보수정
    ResponseEntity<?> resetPassword(PasswordRequest passwordRequest); // 패스워드 찾기 - 리셋
    ResponseEntity<?> updatePassword(PwUpdateRequest pwUpdateRequest, Long userid);
//    public ResponseEntity<?> checkValidity(LoginRequest loginRequest); // 사용자 확인
    ResponseEntity<?> usernameCheck(String username);

    ResponseEntity<?> nicknameCheck(String nickname);

    ResponseEntity<?> login(LoginRequest loginRequest); // 로그인

    ResponseEntity<?> getMyInfo(Long userId); // 회원정보 수정을 위한 정보 조회

    ResponseEntity<?> searchMember(String keyword);
    ProfileResponse getMemberProfile(Long userId, Long loginId); // 사용자 프로필 정보

}
