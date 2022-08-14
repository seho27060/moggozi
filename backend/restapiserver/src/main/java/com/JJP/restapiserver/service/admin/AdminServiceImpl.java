package com.JJP.restapiserver.service.admin;

import com.JJP.restapiserver.domain.dto.MessageResponse;
import com.JJP.restapiserver.domain.dto.admin.MemberInfo;
import com.JJP.restapiserver.domain.entity.member.Member;
import com.JJP.restapiserver.domain.entity.member.Role;
import com.JJP.restapiserver.repository.member.MemberRepository;
import com.JJP.restapiserver.repository.member.RoleRepository;
import com.JJP.restapiserver.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class AdminServiceImpl implements AdminService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final RoleRepository roleRepository;

    @Override
    public ResponseEntity<?> loginAdmin(String username, String password) {
        Optional<Member> admin = memberRepository.findByUsername(username);
        if(admin.isEmpty())
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Check username, password"));

        Optional<Role> role = roleRepository.findById(memberRepository.findByUsername(username).get().getRole().getId());

        if(role.isPresent() && role.get().getName().toString().equals("ROLE_ADMIN") && passwordEncoder.matches(password, admin.get().getPassword())) {  // 관리자에게 따로 Jwt를 발행하진 않는다.

            return ResponseEntity.ok(new MessageResponse("Successfully signed in"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Administrator can only access"));
        }
    }

    @Override
    public ResponseEntity<?> getUserList(String username, String userRole, int pageNo) {
        if(!isAdmin(username, userRole))
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Administrator can only get the list. "));
        Page<MemberInfo> memberInfoList = memberRepository.findByUsernameContaining("%", PageRequest.of(pageNo, 30));

        return ResponseEntity.ok(memberInfoList);
    }

    @Override
    public List<MemberInfo> getUsers(){
        return memberRepository.findAllDesc();
    }


    @Override
    public ResponseEntity<?> updateUserInfo(String username, String userRole, Long memberId) {
        if(!isAdmin(username, userRole))
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Administrator can only update "));

        Optional<Member> member = memberRepository.findById(memberId);

        if(member.isPresent()) {
            if(member.get().getRole().getName().toString().equals("ROLE_USER"))
                member.get().updateRole(roleRepository.findById(2L).get());
            else
                member.get().updateRole(roleRepository.findById(1L).get());
            memberRepository.save(member.get());
            return ResponseEntity.ok(new MessageResponse("Successfully updated."));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Failed to update."));
        }
    }

    @Override
    public ResponseEntity<?> searchUser(String username, String userRole, String keyword) {
        if(!isAdmin(username, userRole))
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Administrator can only search."));
        Page<MemberInfo> memberInfoList = memberRepository.findByUsernameContaining("%"+username+"%", PageRequest.of(0, 30));

        return ResponseEntity.ok(memberInfoList);
    }

    private boolean isAdmin(String username, String userRole) {
        Optional<Member> member = memberRepository.findByUsername(username);
        if(member.get().getRole().getName().toString().equals(userRole))
            return true;
        else
            return false;
    }
}
