package com.JJP.restapiserver.service.member;

import com.JJP.restapiserver.domain.dto.MessageResponse;
import com.JJP.restapiserver.domain.dto.member.request.*;
import com.JJP.restapiserver.domain.dto.member.response.*;
import com.JJP.restapiserver.domain.entity.member.*;
import com.JJP.restapiserver.repository.member.FollowRepository;
import com.JJP.restapiserver.repository.member.MemberRepository;
import com.JJP.restapiserver.repository.member.MemberScoreRepository;
import com.JJP.restapiserver.repository.member.RoleRepository;
import com.JJP.restapiserver.security.JwtUtils;
import com.JJP.restapiserver.security.UserDetailsImpl;
import com.JJP.restapiserver.service.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional
public class MemberServiceImpl implements MemberService {

    private final AuthenticationManager authenticationManager;
    private final MemberRepository memberRepository;
    private final RoleRepository roleRepository;
    private final FollowRepository followRepository;
    private final PasswordEncoder encoder;
    private final JwtUtils jwtUtils;           // jwt 토큰 생성, 분해, 검증, 유효성 검사

    private final RefreshTokenService refreshTokenService;

    private final JavaMailSender javaMailSender;
    private final MemberScoreRepository memberScoreRepository;

    @Value("${spring.mail.username}")
    private String sender;

    /**
     * 회원등록
     */

    @Override
    public ResponseEntity<?> register(SignupRequest signupRequest) {

        String username = signupRequest.getUsername();
        String fullname = signupRequest.getFullname();
        String password = encoder.encode(signupRequest.getPassword());
        String nickname = signupRequest.getNickname();
        String introduce = signupRequest.getIntroduce();
        String user_img = signupRequest.getUserImg();
        int is_private = signupRequest.getIsPrivate();
        int is_social = 0;
        Long role_no = 1L;

        // 이메일 유효성 검사
        String regx = "^(.+)@(.+)$";
        Pattern pattern = Pattern.compile(regx);
        Matcher m = pattern.matcher(username);
        if(!m.matches())
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Wrong format"));

        if (memberRepository.existsByUsername(username)) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username(email) is already taken."));
        }
        if (memberRepository.existsByNickname(nickname)) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Nickname is already taken."));
        }

        Optional<Role> role = roleRepository.findById(role_no);
        // 존재하지 않는 사용자이면서도 사용되지 않은 닉네임을 사용한다면, 사용자 등록
        saveMember(-1L, username, fullname, password, nickname, introduce, user_img, is_private, is_social, role.get());

        return ResponseEntity.ok(new MessageResponse("Registered a user successfully!"));
    }

    /**
     * 회원탈퇴
     */
//    @Transactional
    @Override
    public ResponseEntity<?> delete(String password, Long user_id) {
        Optional<Member> member = memberRepository.findById(user_id);

        if(member.isEmpty())
            return ResponseEntity.badRequest().body(new MessageResponse("Error: The user doesn't exist"));

        if (encoder.matches(password, member.get().getPassword())) {
            member.get().updateRole(roleRepository.findById(2L).get());
            memberRepository.save(member.get());
            return ResponseEntity.ok(new MessageResponse("Deleted a user successfully!"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: The password doesn't match."));
        }
    }


    /**
     * 회원정보 수정
     */
//    @Transactional
    @Override
    public ResponseEntity<?> update(Long user_id, UpdateUserRequest updateUserRequest) {
        Optional<Member> member = memberRepository.findById(user_id);
        if (member.isEmpty()) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: User doesn't exist."));
        }
        String username = updateUserRequest.getUsername();
        String fullname = updateUserRequest.getFullname();
        String nickname = updateUserRequest.getNickname();
        String introduce = updateUserRequest.getIntroduce();
        String user_img = member.get().getUser_img();
        int is_private = updateUserRequest.getIsPrivate();
        int is_social = member.get().getIs_social();

        if (memberRepository.existsByNickname(nickname) && !nickname.equals(member.get().getNickname())) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Written Nickname already exists."));
        }

        // 존재하지 않는 사용자이면서도 사용되지 않은 닉네임을 사용한다면, 사용자 등록
        saveMember(user_id, username, fullname, member.get().getPassword(), nickname, introduce, user_img, is_private, is_social, member.get().getRole());

        return ResponseEntity.ok(new MessageResponse("Updated user information successfully!"));

    }

    /**
     * 패스워드 변경
     */
//    @Transactional
    @Override
    public ResponseEntity<?> updatePassword(PwUpdateRequest pwUpdateRequest, Long userid) {
        Optional<Member> member = memberRepository.findById(userid);
        String currentPassword = pwUpdateRequest.getCurrentPassword();
        String changedPassword = pwUpdateRequest.getChangedPassword();

        if(encoder.matches(currentPassword, member.get().getPassword())) {
            memberRepository.updatePasswordById(encoder.encode(changedPassword), userid);
            return ResponseEntity.ok(new MessageResponse("Updated the user's password successfully."));
        } else {
            return ResponseEntity.internalServerError().body(new MessageResponse("Error: Failed to update password"));
        }
    }

    /**
     * 패스워드 찾기 - 리셋
     */
//    @Transactional
    @Override
    public ResponseEntity<?> resetPassword(PasswordRequest passwordRequest) {
        Optional<Member> member = memberRepository.findByUsername(passwordRequest.getUsername());

        if (member.isPresent() && member.get().getFullname().equals(passwordRequest.getFullname())) {
            String password = resetPassword();
            memberRepository.updatePasswordById(encoder.encode(password), member.get().getId());
            try {
                sendEmail(member.get().getUsername(), password);
                return ResponseEntity.ok(new MessageResponse("Reset user's password successfully."));

            } catch (MessagingException e) {
                return ResponseEntity.internalServerError().body(new MessageResponse("Error: Failed to update password"));
            }
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Error:" + member.get().getUsername() + "doesn't exist."));
        }
    }

    /** 프로필 이미지 수정 */
    @Override
    public ResponseEntity<?> updateImg(Long user_id, UserImgRequest userImgRequest) {
        Optional<Member> member = memberRepository.findById(user_id);
        System.out.println("userImgRequest+++++++: " + userImgRequest.getUserImg());
        if(member == null)
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Error: User doesn't exist."));

        saveMember(user_id, member.get().getUsername()
                , member.get().getFullname(),
                member.get().getPassword(), member.get().getNickname(),
                member.get().getIntroduce(), userImgRequest.getUserImg(),
                member.get().getIs_private(), member.get().getIs_social(),
                member.get().getRole());
        return ResponseEntity.ok(new MessageResponse("Successfully updated the user image."));
    }

    /**
     * 아이디 중복 검사
     */
    @Override
    public ResponseEntity<?> usernameCheck(String username) {
        if(!memberRepository.existsByUsername(username)) {
            // 이메일 유효성 검사
            String regx = "^(.+)@(.+)$";
            Pattern pattern = Pattern.compile(regx);
            Matcher m = pattern.matcher(username);
            if(m.matches())
                return ResponseEntity.ok(new MessageResponse("Username is available"));
            else
                return ResponseEntity.badRequest().body(new MessageResponse("Error: Wrong format"));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Username(email) is already taken."));
        }
    }

    @Override
    public ResponseEntity<?> nicknameCheck(String nickname) {
        if(!memberRepository.existsByNickname(nickname)) {
            return ResponseEntity.ok(new MessageResponse("Nickname is available."));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Nickname is already taken."));
        }
    }

    /**
     * 로그인
     */
//    @Transactional
    @Override
    public ResponseEntity<?> login(LoginRequest loginRequest) {

        Member member = memberRepository.findByUsername(loginRequest.getUsername()).get();
        if(member.getRole().getName().toString().equals("ROLE_INVALIDATED_USER"))
            return ResponseEntity.badRequest().body("Error: The user doesn't exist.");

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
        return ResponseEntity.ok(JwtResponse.builder().accessToken(jwt)
                .refreshToken(refreshToken.getToken())
                .id(userDetails.getId())
                .username(userDetails.getUsername())
                .nickname(userDetails.getNickname()).userImg(member.getUser_img()).build());
    }

    /**
     * 사용자 세부정보 얻기 - 회원정보 조회
     */
    @Override
    public ResponseEntity<?> getMyInfo(Long user_id) {

        Member member = memberRepository.findById(user_id).get();

        UpdateInfoResponse updateInfoResponse = UpdateInfoResponse.builder()
                .id(member.getId())
                .fullname(member.getFullname())
                .username(member.getUsername())
                .nickname(member.getNickname())
                .introduce(member.getIntroduce())
                .userImg(member.getUser_img())
                .isPrivate(member.getIs_private())
                .isSocial(member.getIs_social())
                .score(member.getMemberScore().getScore())
                .build();

        return ResponseEntity.ok(updateInfoResponse);
    }

    @Override
    public ResponseEntity<?> searchMember(String keyword) {
        List<SearchMemberResponse> memberList = memberRepository.findByKeyword("%"+keyword+"%");
        if(memberList.isEmpty()) {
            return ResponseEntity.ok(new MessageResponse("No user"));
        } else {
            return ResponseEntity.ok(memberList);
        }
    }

    /**
     * 조회하고 싶은 사용자 아이디를 인자로 넣어주면, 유저의 프로필 정보를 반환합니다.
     * 프로필 정보: id, username(=email), nickname, user_img, introduce, is_private(프로필 정보 공개 여부)
     * @param userId: 조회하고자하는 사용자의 id
     * @return ProfileResponse
     */
    @Override
    public ProfileResponse getMemberProfile(Long userId, Long loginId) {
        Member member = memberRepository.findById(userId).get();
        int followedCnt = followRepository.countByFollower(member.getId());
        int followingCnt = followRepository.countByFollowing(member.getId());
        int followStatus = followRepository.existsByFrom_memberAndTo_member(loginId, userId) >= 1 ? 1 : 0; // 1: follow, 0: unfollow

        return ProfileResponse.builder()
                .id(member.getId())
                .nickname(member.getNickname())
                .introduce(member.getIntroduce())
                .userImg(member.getUser_img())
                .isPrivate(member.getIs_private())
                .followedCnt(followedCnt)
                .followingCnt(followingCnt)
                .isFollowing(followStatus)
                .score(member.getMemberScore().getScore())
                .build();
    }

    @Override
    public MemberPageDto getMemberListUsingPagination(String nickname, Pageable pageable) {
        Page<Member> pageResult = memberRepository.findByNicknameContaining(nickname, pageable);
        List<Member> memberList = pageResult.toList();
        List<MemberResponseDto> memberResponseDtoList = memberList.stream()
                .map(o -> MemberToDto(o)).collect(Collectors.toList());
        MemberPageDto memberPageDto = MemberPageDto.builder()
                .content(memberResponseDtoList)
                .pageNum(pageResult.getNumber())
                .totalPages(pageResult.getTotalPages())
                .size(pageResult.getSize())
                .totalElements(pageResult.getTotalElements())
                .build();

        return memberPageDto;
    }

    // 사용자 정보 저장 / 수정
    private void saveMember(Long user_id, String username, String fullname, String password, String nickname, String introduce, String user_img, int is_private, int is_social, Role role) {
        Member member;
        if (user_id == -1L) {
            member = Member.builder().
                    username(username).fullname(fullname)
                    .password(password).nickname(nickname)
                    .introduce(introduce).user_img(user_img)
                    .is_private(is_private).role(role).is_social(is_social).build();
        } else {
             member = Member.builder().id(user_id)
                    .username(username).fullname(fullname)
                    .password(password).nickname(nickname)
                    .introduce(introduce).user_img(user_img)
                    .is_private(is_private).role(role).is_social(is_social).build();
        }
        memberRepository.save(member);

        if (user_id == -1L) {
            MemberScore memberScore = MemberScore.builder()
                    .member(member)
                    .score(0L)
                    .build();
            memberScoreRepository.save(memberScore);
        }
    }

    // 비밀번호 리셋
    private String resetPassword() {
        Random random = new Random();

        String updatedPassword = random.ints(33, 123)
                .limit(2)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();

        return updatedPassword;
    }

    // 비밀번호 리셋 시, 이메일 보내기
    private void sendEmail(String username, String password) throws MessagingException {

        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
        mimeMessageHelper.setFrom(sender);
        mimeMessageHelper.setTo(username);
        mimeMessageHelper.setSubject("[Moggozi] 임시 비밀번호 안내");

        MailBodyUtil body = new MailBodyUtil();
        mimeMessageHelper.setText(body.getBody(username,password), true);
//        mimeMessageHelper.addInline("Moggozi", new FileDataSource("../resources/moggozi.jpg"));
        javaMailSender.send(mimeMessage);
    }


    private MemberResponseDto MemberToDto(Member member){
        MemberResponseDto memberResponseDto = MemberResponseDto.builder()
                .img(member.getUser_img())
                .id(member.getId())
                .nickname(member.getNickname())
                .build();
        return memberResponseDto;
    }
}
//    @Override
//    public ResponseEntity<?> checkValidity(LoginRequest loginRequest) {
//        Optional<Member> member = memberRepository.findByUsername(loginRequest.getUsername());
//        if (encoder.matches(loginRequest.getPassword(), member.get().getPassword())) {
//            return ResponseEntity.ok(new MessageResponse("Validated user"));
//        } else {
//            return ResponseEntity.badRequest().body(new MessageResponse("Invalidated user"));
//        }
//    }
