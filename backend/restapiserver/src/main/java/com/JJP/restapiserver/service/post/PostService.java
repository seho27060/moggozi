package com.JJP.restapiserver.service.post;

import com.JJP.restapiserver.domain.dto.challenge.ChallengeListResponseDto;
import com.JJP.restapiserver.domain.dto.post.PostResponseDto;
import com.JJP.restapiserver.domain.dto.post.PostSaveRequestDto;
import com.JJP.restapiserver.domain.dto.post.PostUpdateRequestDto;
import com.JJP.restapiserver.domain.entity.stage.Post;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PostService {

    // 스테이지 포스트 등록
    PostResponseDto savePost(PostSaveRequestDto postSaveRequestDto);

    // 스테이지 포스트 수정
    PostResponseDto updatePost(PostUpdateRequestDto postUpdateRequestDto);

    // 스테이지 포스트 삭제
    void deletePost(Long post_id);

    // 특정 유저가 올린 스테이지 포스트 리스트 조회
    List getMemberPost(Long member_id);

    // 특정 스테이지 전체 포스트 조회
    List getStagePost(Long stage_id);

    Long writtenPostNum(Long member_id);

    List<PostResponseDto> writtenPostList8(Long member_id);

    List<PostResponseDto> getRandomPostList(int size);
}
