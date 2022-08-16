package com.JJP.restapiserver.service.stage;

import com.JJP.restapiserver.domain.dto.challenge.Writer;
import com.JJP.restapiserver.domain.dto.stage.CommentRequestDto;
import com.JJP.restapiserver.domain.dto.stage.CommentResponseDto;
import com.JJP.restapiserver.domain.entity.member.Member;
import com.JJP.restapiserver.domain.entity.stage.Comment;
import com.JJP.restapiserver.domain.entity.stage.Post;
import com.JJP.restapiserver.domain.entity.stage.Stage;
import com.JJP.restapiserver.repository.stage.CommentRepository;
import com.JJP.restapiserver.repository.member.MemberRepository;
import com.JJP.restapiserver.repository.stage.PostRepository;
import com.JJP.restapiserver.repository.stage.StageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{

    private final PostRepository postRepository;

    private final MemberRepository memberRepository;

    private final CommentRepository commentRepository;


    @Override
    public List<CommentResponseDto> getPostCommentList(Long post_id) {
        List<Comment> commentList = commentRepository.findByPost_id(post_id);
        List<CommentResponseDto> commentResponseDtoList = new ArrayList<>();
        for(int i = 0; i < commentList.size(); i++){
            CommentResponseDto commentResponseDto = new CommentResponseDto(commentList.get(i));
            commentResponseDtoList.add(commentResponseDto);
        }
        return commentResponseDtoList;
    }

    @Override
    public List<CommentResponseDto> getMyCommentList(Long member_id) {
        // 먼저 유저 인덱스를 통해서 유저 정보 받아오기
        Member member = memberRepository.getById(member_id);
        List<Comment> commentList = member.getCommentList();
        List<CommentResponseDto> commentResponseDtoList = new ArrayList<>();
        for(int i = 0; i < commentList.size(); i++){
            CommentResponseDto commentResponseDto = new CommentResponseDto(commentList.get(i));
            commentResponseDtoList.add(commentResponseDto);
        }
        return commentResponseDtoList;
    }


    @Override
    public ResponseEntity registerComment(CommentRequestDto commentRequestDto, Long member_id) {
        Comment comment = Comment.builder()
                .post(postRepository.getById(commentRequestDto.getPostId()))
                .text(commentRequestDto.getText())
                .member(memberRepository.getById(member_id))
                .parent(commentRequestDto.getParent())
                .commentOrder(commentRequestDto.getOrder())
                .state(commentRequestDto.getState())
                .build();
        commentRepository.save(comment);
        CommentResponseDto commentResponseDto = new CommentResponseDto(comment);
        return new ResponseEntity(commentResponseDto, HttpStatus.OK);
    }

    @Override
    public ResponseEntity updateComment(Long comment_id, CommentRequestDto commentRequestDto) {
        Comment comment = commentRepository.getById(comment_id);
        comment.update(commentRequestDto);
        commentRepository.save(comment);
        CommentResponseDto commentResponseDto = new CommentResponseDto(comment);
        return new ResponseEntity(commentResponseDto, HttpStatus.OK);
    }

    @Override
    public ResponseEntity deleteComment(Long comment_id) {
        commentRepository.deleteById(comment_id);
        return new ResponseEntity(HttpStatus.OK);
    }

    @Override
    public Writer getCommentWriter(Long comment_id) {
        Comment comment = commentRepository.getById(comment_id);
        Writer writer = new Writer(comment.getMember().getId(), comment.getMember().getNickname(), comment.getMember().getUser_img(), comment.getMember().getMemberScore().getScore());
        return writer;
    }
}
