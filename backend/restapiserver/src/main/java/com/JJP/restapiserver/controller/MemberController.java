package com.JJP.restapiserver.controller;

import com.JJP.restapiserver.domain.dto.member.request.LoginRequest;
import com.JJP.restapiserver.domain.dto.member.request.LogoutRequest;
import com.JJP.restapiserver.domain.dto.member.request.SignupRequest;
import com.JJP.restapiserver.domain.dto.member.request.TokenRefreshRequest;
import com.JJP.restapiserver.domain.dto.member.response.JwtResponse;
import com.JJP.restapiserver.domain.dto.MessageResponse;
import com.JJP.restapiserver.domain.dto.member.response.TokenRefreshResponse;
import com.JJP.restapiserver.domain.entity.member.ERole;
import com.JJP.restapiserver.domain.entity.member.Member;
import com.JJP.restapiserver.domain.entity.member.RefreshToken;
import com.JJP.restapiserver.domain.entity.member.Role;
import com.JJP.restapiserver.exception.TokenRefreshException;
import com.JJP.restapiserver.repository.MemberRepository;
import com.JJP.restapiserver.repository.RoleRepository;
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
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/user")
public class MemberController {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    MemberRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    JwtUtils jwtUtils;           // jwt 토큰 생성, 분해, 검증, 유효성 검사

    // RereshToken 생성을 위한 Service
    @Autowired
    RefreshTokenService refreshTokenService;

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) { // 아이디, 비밀번호를 body에 담아 전송

        // Authentication 객체를 생성한다 by AuthenticationManager
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        // Security Context에 인증정보를 저장한다.
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // UserDetails Object를 만든다.
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        String jwt = jwtUtils.generateJwtToken(userDetails);

        // 사용자 권한 정보를 확인한다.
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        RefreshToken refreshToken = refreshTokenService.createRefreshToken(userDetails.getId());

        // Http Cookie에 token 정보를 담아 보낸다.
        return ResponseEntity.ok(new JwtResponse(jwt, refreshToken.getToken()
                , userDetails.getId(), userDetails.getUsername()
                , userDetails.getFullname(), roles));
    }

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {

        // 이메일이 이미 사용 중임을 알린다. (이미 같은 이메일로 가입한 사용자가 존재한다.)
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username is already taken!"));
        }

        // 이미 등록된 닉네임인지를 확인한다.
        if (userRepository.existsByFullname(signUpRequest.getFullname())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Email is already in use!"));
        }

        // 계정을 생성할 수 있다.
        Member user = new Member(signUpRequest.getUsername(),
                signUpRequest.getFullname(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = signUpRequest.getRole();
        Set<Role> roles = new HashSet<>();

        if (strRoles == null) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(adminRole);
                        break;
                    case "invalidated":
                        Role modRole = roleRepository.findByName(ERole.ROLE_INVALIDATED_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(modRole);
                        break;
                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(userRole);
                }
            });
        }
        user.setRoles(roles);
        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    // 로그아웃
    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(@Valid @RequestBody LogoutRequest logoutRequest) {
        refreshTokenService.deleteByMemberId(logoutRequest.getId());
        return ResponseEntity.ok(new MessageResponse("Log out successful"));
    }

    @PostMapping("/refreshtoken")
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

}
