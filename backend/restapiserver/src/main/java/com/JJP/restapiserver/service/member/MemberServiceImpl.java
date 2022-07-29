package com.JJP.restapiserver.service.member;

import com.JJP.restapiserver.domain.dto.MessageResponse;
import com.JJP.restapiserver.domain.dto.member.request.LoginRequest;
import com.JJP.restapiserver.domain.dto.member.request.SignupRequest;
import com.JJP.restapiserver.domain.dto.member.request.UpdateUserRequest;
import com.JJP.restapiserver.domain.dto.member.response.JwtResponse;
import com.JJP.restapiserver.domain.entity.member.Member;
import com.JJP.restapiserver.domain.entity.member.RefreshToken;
import com.JJP.restapiserver.domain.entity.member.Role;
import com.JJP.restapiserver.repository.member.MemberRepository;
import com.JJP.restapiserver.repository.member.RoleRepository;
import com.JJP.restapiserver.security.JwtUtils;
import com.JJP.restapiserver.security.UserDetailsImpl;
import com.JJP.restapiserver.service.RefreshTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    MemberRepository memberRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    JwtUtils jwtUtils;           // jwt 토큰 생성, 분해, 검증, 유효성 검사

    @Autowired
    RefreshTokenService refreshTokenService;

    /** 회원등록 */
    @Override
    public ResponseEntity<?> register(SignupRequest signupRequest) {

        String username = signupRequest.getUsername();
        String fullname = signupRequest.getFullname();
        String password = encoder.encode(signupRequest.getPassword());
        String nickname = signupRequest.getNickname();
        String introduce = signupRequest.getIntroduce();
        String user_img = signupRequest.getUser_img();
        int is_private = signupRequest.getIs_private();
        Long role_no = signupRequest.getRole() == null ? 1 : signupRequest.getRole();

        if(memberRepository.existsByUsername(username)) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username(email) is already taken."));
        }
        if(memberRepository.existsByNickname(nickname)) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Nickname is already taken."));
        }
        if(role_no > 4 && role_no < 1) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: The role number doesn't exist."));
        }

        Optional<Role> role = roleRepository.findById(role_no);
        // 존재하지 않는 사용자이면서도 사용되지 않은 닉네임을 사용한다면, 사용자 등록
        saveMember(-1L, username, fullname, password, nickname, introduce, user_img, is_private, role.get());

        return ResponseEntity.ok(new MessageResponse("Registered a user successfully!"));
    }

    /** 회원탈퇴 */
    @Override
    public ResponseEntity<?> delete(Long user_id) {
        Optional<Member> member = memberRepository.findById(user_id);

        if(member.isEmpty())
            return ResponseEntity.badRequest().body(new MessageResponse("Error: The user doesn't exist"));

        memberRepository.updateRoleById("ROLE_INVALIDATED_USER", user_id);

        return ResponseEntity.ok(new MessageResponse("Deleted a user successfully!"));
    }

    /** 회원정보 수정 */
    @Override
    public ResponseEntity<?> update(Long user_id, UpdateUserRequest updateUserRequest) {
        Optional<Member> member = memberRepository.findById(user_id);
        if(member.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: User doesn't exist."));
        }

        String username = updateUserRequest.getUsername();
        String fullname = updateUserRequest.getFullname();
        String nickname = updateUserRequest.getNickname();
        String introduce = updateUserRequest.getIntroduce();
        String user_img = updateUserRequest.getUser_img();
        int is_private = updateUserRequest.getIs_private();

        if(memberRepository.existsByNickname(nickname)) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Written Nickname already exists." ));
        }

        // 존재하지 않는 사용자이면서도 사용되지 않은 닉네임을 사용한다면, 사용자 등록
        saveMember(user_id, username, fullname, member.get().getPassword(), nickname, introduce, user_img, is_private, member.get().getRole());

        return ResponseEntity.ok(new MessageResponse("Updated user information successfully!"));

    }

    /** 패스워드 변경 */
    @Override
    public ResponseEntity<?> updatePassword(LoginRequest loginRequest) {
        Optional<Member> member = memberRepository.findByUsername(loginRequest.getUsername());

        if(encoder.matches(loginRequest.getPassword(), member.get().getPassword())) {
            memberRepository.updatePasswordById(encoder.encode(loginRequest.getPassword()), member.get().getId());
            return ResponseEntity.ok(new MessageResponse("Updated password successfully"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Password doesn't match"));
        }
    }

    /** 사용자 비밀번호 변경 */
    @Override
    public ResponseEntity<?> checkValidity(LoginRequest loginRequest) {
        Optional<Member> member = memberRepository.findByUsername(loginRequest.getUsername());

        if(encoder.matches(loginRequest.getPassword(), member.get().getPassword())) {
            return ResponseEntity.ok(new MessageResponse("Validated user"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Invalidated user"));
        }
    }

    /** 로그인 */
    @Override
    public ResponseEntity<?> login(LoginRequest loginRequest) {
        // Authentication 객체를 생성한다 by AuthenticationManager
        Authentication authentication = authenticationManager
                        .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        // Security Context에 인증정보를 저장한다.
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // UserDetails Object를 만든다.
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        String jwt = jwtUtils.generateJwtToken(userDetails);

        // 사용자 권한 정보를 확인한다.
        Long role = userDetails.getAuthority();

        RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());

        return ResponseEntity.ok(new JwtResponse(jwt, refreshToken.getToken()
                , userDetails.getId(), userDetails.getUsername()
                , userDetails.getNickname(), role));
    }

    /** 사용자 세부정보 얻기 - 회원정보 조회 */
    @Override
    public ResponseEntity<?> findUser(Long user_id) {
        Optional<Member> member = memberRepository.findById(user_id);

        if(member.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("User information doesn't exist."));
        } else {
            return ResponseEntity.ok(member);
        }
    }


    private void saveMember(Long user_id, String username, String fullname, String password, String nickname, String introduce, String user_img, int is_private, Role role) {
        Member member = null;
        if(user_id == -1L) {
            member = Member.builder().
                username(username).fullname(fullname)
                .password(password).nickname(nickname)
                .introduce(introduce).user_img(user_img)
                .is_private(is_private).role(role).build();
        } else {
            member = Member.builder().id(user_id).
                    username(username).fullname(fullname)
                    .password(password).nickname(nickname)
                    .introduce(introduce).user_img(user_img)
                    .is_private(is_private).role(role).build();
        }

        memberRepository.save(member);
    }
}
