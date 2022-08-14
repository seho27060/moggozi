package com.JJP.restapiserver.service.stage;

import com.JJP.restapiserver.domain.dto.challenge.Writer;
import com.JJP.restapiserver.domain.dto.stage.CommentRequestDto;
import com.JJP.restapiserver.domain.dto.stage.CommentResponseDto;
import com.JJP.restapiserver.domain.entity.stage.Comment;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CommentService {
    // 특정 스테이지에 있는 모든 댓글 반환
    // 특정 스테이지를 조회 해서 그 스테이지에 list 로 가지고 있는 댓글 리스트 반환
    List<CommentResponseDto> getPostCommentList(Long post_id);
    // 내가 단 댓글 리스트 반환
    List<CommentResponseDto> getMyCommentList(Long user_id);

    ResponseEntity registerComment(CommentRequestDto commentRequestDto, Long member_id);
    ResponseEntity updateComment(Long comment_id, CommentRequestDto commentRequestDto);
    ResponseEntity deleteComment(Long comment_id);

    Writer getCommentWriter(Long comment_id);
}
