package com.JJP.restapiserver.service.stage;

import com.JJP.restapiserver.domain.dto.stage.CommentRequestDto;
import com.JJP.restapiserver.domain.entity.member.Member;
import com.JJP.restapiserver.domain.entity.stage.Comment;
import com.JJP.restapiserver.domain.entity.stage.Stage;
import com.JJP.restapiserver.repository.stage.CommentRepository;
import com.JJP.restapiserver.repository.member.MemberRepository;
import com.JJP.restapiserver.repository.stage.StageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{

    private final StageRepository stageRepository;

    private final MemberRepository memberRepository;

    private final CommentRepository commentRepository;

    @Override
    public List<Comment> getStageCommentList(Long stage_id) {
        // stage 찾는 방법
        Stage stage = stageRepository.getById(stage_id);
        return stage.getCommentList();
    }

    @Override
    public List<Comment> getMyCommentList(Long member_id) {
        // 먼저 유저 인덱스를 통해서 유저 정보 받아오기
        Member member = memberRepository.getById(member_id);
        return member.getCommentList();
    }

    @Override
    public ResponseEntity registerComment(CommentRequestDto commentRequestDto, Long member_id) {
        Comment comment = Comment.builder()
                .stage(stageRepository.getById(commentRequestDto.getStage_id()))
                .text(commentRequestDto.getText())
                .member(memberRepository.getById(member_id))
                .parent(commentRequestDto.getParent())
                .depth(commentRequestDto.getDepth())
                .comment_state(commentRequestDto.getComment_state())
                .build();
        commentRepository.save(comment);
        return new ResponseEntity(HttpStatus.OK);
    }

    @Override
    public ResponseEntity updateComment(Long comment_id, CommentRequestDto commentRequestDto) {
        Comment comment = commentRepository.getById(comment_id);
        comment.update(commentRequestDto);
        commentRepository.save(comment);
        return new ResponseEntity(HttpStatus.OK);
    }

    @Override
    public ResponseEntity deleteComment(Long comment_id) {
        commentRepository.deleteById(comment_id);
        return new ResponseEntity(HttpStatus.OK);
    }
}
