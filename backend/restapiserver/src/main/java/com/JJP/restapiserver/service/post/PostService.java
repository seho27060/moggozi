package com.JJP.restapiserver.service.post;

import com.JJP.restapiserver.domain.dto.post.PostSaveRequestDto;
import com.JJP.restapiserver.domain.dto.post.PostUpdateRequestDto;
import com.JJP.restapiserver.domain.entity.stage.Post;

import java.util.List;

public interface PostService {

    // 스테이지 포스트 등록
    Long savePost(PostSaveRequestDto postSaveRequestDto);

    // 스테이지 포스트 수정
    Long updatePost(PostUpdateRequestDto postUpdateRequestDto);

    // 스테이지 포스트 삭제
    void deletePost(Long post_id);

    // 특정 유저가 올린 스테이지 포스트 리스트 조회
    List<Post> getMemberPost(Long member_id);

    // 특정 스테이지 전체 포스트 조회
    List<Post> getStagePost(Long stage_id);
}
