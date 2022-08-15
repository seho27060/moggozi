package com.JJP.restapiserver.service.post;

import com.JJP.restapiserver.domain.dto.member.response.MyPagePostDto;
import com.JJP.restapiserver.domain.dto.post.*;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PostService {

    // 스테이지 포스트 등록
    Long savePost(PostSaveRequestDto postSaveRequestDto, Long member_id);

    // 스테이지 포스트 수정
    int updatePost(PostUpdateRequestDto postUpdateRequestDto, Long member_id);

    // 스테이지 포스트 삭제
    void deletePost(Long post_id);

    // 특정 유저가 올린 스테이지 포스트 리스트 조회
    List getMemberPost(Long member_id);

    // 특정 스테이지 전체 포스트 조회
    List getStagePost(Long stage_id);

    Long writtenPostNum(Long member_id);

    List<PostResponseDto> writtenPostList8(Long member_id);

    List<PostResponseDto> getRandomPostList(int size);

    MyPagePostDto infinitePostList(Long member_id, Pageable pageable);

    // 포스트 디테일 받아오기
    PostDetailDto detailPost(Long post_id, Long member_id);

    // 포스트 사용자와 스테이지 정보로 받아오기
    Object detailMemberPost(Long stage_id, Long member_id);
}
