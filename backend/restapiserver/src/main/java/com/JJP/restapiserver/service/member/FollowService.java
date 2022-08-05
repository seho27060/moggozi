package com.JJP.restapiserver.service.member;


import org.springframework.http.ResponseEntity;

public interface FollowService {

    ResponseEntity<?> follow(Long fromMemberId, Long toMemberId);

    ResponseEntity<?> unfollow(Long fromMemberId, Long toMemberId);

    ResponseEntity<?> followingList(Long fromMemberId);

    ResponseEntity<?> followedList(Long toMemberId, Long loginId);
}

