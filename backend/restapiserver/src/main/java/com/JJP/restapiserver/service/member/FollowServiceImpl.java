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
@Transactional
@RequiredArgsConstructor
public class FollowServiceImpl implements FollowService {

    private final MemberRepository memberRepository;
    private final FollowRepository followRepository;

    @Override
    public ResponseEntity<?> follow(Long fromMemberId, Long toMemberId) {
        Member fromMember = memberRepository.findById(fromMemberId).get();
        Member toMember = memberRepository.findById(toMemberId).get();
        try {
            if (fromMemberId == toMemberId) throw new Exception();

            System.out.println("Follow 하고 있는지의 여부" + followRepository.existsByFrom_memberAndTo_member(fromMemberId, toMemberId));
            if(followRepository.existsByFrom_memberAndTo_member(fromMemberId, toMemberId) >= 1) {
                followRepository.deleteByFrom_memberAndTo_member(fromMemberId, toMemberId);
                return ResponseEntity.ok().body(new MessageResponse("Successfully unfollowed."));
            }

            Follow follow = Follow.builder().from_member(fromMember).to_member(toMember).build();
            followRepository.saveAndFlush(follow);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new MessageResponse("Error: Failed to follow."));
        }
        return ResponseEntity.ok(new MessageResponse("Successfully followed."));
    }


    @Override
    public ResponseEntity<?> unfollow(Long fromMemberId, Long toMemberId) {
        return followRepository.deleteByFrom_memberAndTo_member(fromMemberId, toMemberId) != 1
                ? ResponseEntity.badRequest().body(new MessageResponse("Error: unfollow에 실패했습니다."))
                : ResponseEntity.ok(new MessageResponse("unfollow가 성공했습니다."));
    }


    // 상대가 팔로우하는 사람들의 리스트 반환

    @Override
    public ResponseEntity<?> followingList(Long fromMemberId) {

        List<Following> memberList = followRepository.findAllByFrom_member(fromMemberId);
        FollowingListResponse followingListResponse = FollowingListResponse.builder()
                .totalCount(memberList.size())
                .memberInfoList(memberList).build();
        return ResponseEntity.ok(followingListResponse);
    }

    // 상대를 팔로우하는 사람들의 리스트 반환 (나 역시 상대를 팔로우하는지를 나타낼 것

    @Override
    public ResponseEntity<?> followedList(Long toMemberId, Long loginId) {
        List<Followed> memberList = followRepository.findAllByTo_member(toMemberId, loginId);
        FollowedListResponse followedListResponse = FollowedListResponse.builder()
                .totalCount(memberList.size())
                .memberInfoList(memberList).build();
        return ResponseEntity.ok(followedListResponse);
    }

}
