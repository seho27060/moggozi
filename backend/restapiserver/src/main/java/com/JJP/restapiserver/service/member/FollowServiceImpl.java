package com.JJP.restapiserver.service.member;

import com.JJP.restapiserver.domain.dto.MessageResponse;
import com.JJP.restapiserver.domain.dto.member.response.Followed;
import com.JJP.restapiserver.domain.dto.member.response.FollowedListResponse;
import com.JJP.restapiserver.domain.dto.member.response.Following;
import com.JJP.restapiserver.domain.dto.member.response.FollowingListResponse;
import com.JJP.restapiserver.domain.entity.member.Follow;
import com.JJP.restapiserver.domain.entity.member.Member;
import com.JJP.restapiserver.repository.member.FollowRepository;
import com.JJP.restapiserver.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService {

    private final MemberRepository memberRepository;
    private final FollowRepository followRepository;

    @Transactional
    @Override
    public ResponseEntity<?> follow(Long fromMemberId, Long toMemberId) {
        Member fromMember = memberRepository.getById(fromMemberId);
        Member toMember = memberRepository.getById(toMemberId);
        try {
            if (fromMemberId.equals(toMemberId)) throw new Exception();

            Follow follow = followRepository.save(Follow.builder().from_member(fromMember).to_member(toMember).build());

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: 팔로우에 실패했습니다."));
        }
        return ResponseEntity.ok(new MessageResponse("팔로우에 성공했습니다."));
    }

    @Transactional
    @Override
    public ResponseEntity<?> unfollow(Long fromMemberId, Long toMemberId) {
        return followRepository.deleteByFrom_memberAndTo_member(fromMemberId, toMemberId) != 1
                ? ResponseEntity.badRequest().body(new MessageResponse("Error: unfollow에 실패했습니다."))
                : ResponseEntity.ok(new MessageResponse("unfollow가 성공했습니다."));
    }


    // 상대가 팔로우하는 사람들의 리스트 반환
    @Transactional
    @Override
    public ResponseEntity<?> followingList(Long fromMemberId) {

        List<Following> memberList = followRepository.findAllByFrom_member(fromMemberId);
        FollowingListResponse followingListResponse = FollowingListResponse.builder()
                .totalCount(memberList.size())
                .memberInfoList(memberList).build();
        return ResponseEntity.ok(followingListResponse);
    }

    // 상대를 팔로우하는 사람들의 리스트 반환 (나 역시 상대를 팔로우하는지를 나타낼 것
    @Transactional
    @Override
    public ResponseEntity<?> followedList(Long toMemberId, Long loginId) {
        List<Followed> memberList = followRepository.findAllByTo_member(toMemberId, loginId);
        FollowedListResponse followedListResponse = FollowedListResponse.builder()
                .totalCount(memberList.size())
                .memberInfoList(memberList).build();
        return ResponseEntity.ok(followedListResponse);
    }

}
