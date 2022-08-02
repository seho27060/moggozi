package com.JJP.restapiserver.controller.member;

import com.JJP.restapiserver.domain.dto.MessageResponse;
import com.JJP.restapiserver.domain.dto.member.request.*;
import com.JJP.restapiserver.domain.dto.member.response.TokenRefreshResponse;
import com.JJP.restapiserver.domain.entity.member.RefreshToken;
import com.JJP.restapiserver.exception.TokenRefreshException;
import com.JJP.restapiserver.security.JwtUtils;
import com.JJP.restapiserver.service.RefreshTokenService;
import com.JJP.restapiserver.service.member.MemberServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/user")
public class MemberController {

    @Autowired
    MemberServiceImpl memberService;

    // RereshToken 생성을 위한 Service
    @Autowired
    RefreshTokenService refreshTokenService;

    // jwt 토큰 생성을 위한 JWT Util
    @Autowired
    JwtUtils jwtUtils;

    /** 로그인 */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) { // 아이디, 비밀번호를 body에 담아 전송
        return memberService.login(loginRequest);
    }

    /** 회원가입 */
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
        return memberService.register(signUpRequest);
    }

    /** 회원탈퇴 */
    @PostMapping("/delete")
    public ResponseEntity<?> deleteUser(@Valid @RequestBody DeleteUserRequest deleteUserRequest, HttpServletRequest request) {
        Long user_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
        return memberService.delete(deleteUserRequest.getPassword(), user_id);
    }

    /** username(이메일) 중복 체크 */
    @PostMapping("/idcheck/{username}")
    public ResponseEntity<?> usernameCheck(@PathVariable String username) {
        return memberService.usernameCheck(username);
    }

    /** nickname 중복 체크 */
    @PostMapping("/nickcheck/{nickname}")
    public ResponseEntity<?> nicknameCheck(@PathVariable String nickname) {
        return memberService.nicknameCheck(nickname);
    }

    /** 로그아웃 */
    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(@Valid @RequestBody LogoutRequest logoutRequest) {
        refreshTokenService.deleteByMemberId(logoutRequest.getId());
        return ResponseEntity.ok(new MessageResponse("Log out successful"));
    }

    /** 리프레시 토큰 생성 */
    @PostMapping("/refreshToken")
    public ResponseEntity<?> refreshtoken(@Valid @RequestBody TokenRefreshRequest tokenRefreshRequest) {
        String requestRefreshToken = tokenRefreshRequest.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getMember)
                .map(user -> {
                    String token = jwtUtils.generateTokenFromUsername(user.getUsername());
                    return ResponseEntity.ok(new TokenRefreshResponse(token, requestRefreshToken));
                }).
                orElseThrow(() -> new TokenRefreshException(requestRefreshToken
                        , "Refresh token is not in database!"));
    }

    /** 회원정보 수정 */
    @PostMapping("/update/{user_id}")
    public ResponseEntity<?> updateUser(@PathVariable Long user_id, @Valid @RequestBody UpdateUserRequest updateUserRequest) {
        return memberService.update(user_id, updateUserRequest);
    }

//    @PostMapping("/validity")
//    public ResponseEntity<?> checkValidity(@Valid @RequestBody LoginRequest loginRequest) {
//        return memberService.checkValidity(loginRequest);
//    }

    /** 비밀번호 업데이트 */
    @PostMapping("/updatepw")
    public ResponseEntity<?> updatePassword(@RequestBody PwUpdateRequest pwUpdateRequest, HttpServletRequest request) {
        Long user_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
        return memberService.updatePassword(pwUpdateRequest, user_id);
    }

    /** 비밀번호 찾기 - 리셋 */
    @PostMapping("/resetpw")
    public ResponseEntity<?> resetPassword(@RequestBody PasswordRequest request) {
        return memberService.resetPassword(request);
    }

    /** 타유저 정보 획득하기 */
    @GetMapping("/info/{user_id}")
    public ResponseEntity<?> getUserInfo(@PathVariable Long user_id) {
        return memberService.findUser(user_id);
    }

    /** 자신의 유저정보 획득하기 */
    @GetMapping("/myinfo")
    public ResponseEntity<?> getMyInfo(HttpServletRequest request) {
        //  TOKEN에서 UserID 추출
        Long user_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
        return memberService.findUser(user_id);
    }
//
//    @GetMapping("/follow/{user_id}")
//    public ResponseEntity<?> getFollowList(@PathVariable Long user_id) {
////        return memberService.getFollowList(user_id);=
////
////
////
////        =
//     }
}


