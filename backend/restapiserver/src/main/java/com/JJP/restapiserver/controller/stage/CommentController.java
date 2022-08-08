package com.JJP.restapiserver.controller.stage;

import com.JJP.restapiserver.domain.dto.stage.CommentRequestDto;
import com.JJP.restapiserver.domain.dto.stage.CommentResponseDto;
import com.JJP.restapiserver.security.JwtUtils;
import com.JJP.restapiserver.service.stage.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
//@CrossOrigin("*")
@RequestMapping("/comment")
@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    private final JwtUtils jwtUtils;

    @GetMapping("/{post_id}")
    public ResponseEntity getPostCommentList(@PathVariable Long post_id)
    {
        List<CommentResponseDto> commentList = commentService.getPostCommentList(post_id);
        return new ResponseEntity(commentList, HttpStatus.OK);
    }

    @GetMapping("/myCommentList/")
    public ResponseEntity getMyCommentList(HttpServletRequest request){
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
        List<CommentResponseDto> commentList =  commentService.getMyCommentList(member_id);
        return new ResponseEntity(commentList, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity registerComment(@RequestBody CommentRequestDto commentRequestDto, HttpServletRequest request)
    {
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));
        return commentService.registerComment(commentRequestDto, member_id);
    }

    @PutMapping("/{comment_id}")
    public ResponseEntity updateComment(@PathVariable Long comment_id, @RequestBody CommentRequestDto commentRequestDto)
    {
        return commentService.updateComment(comment_id, commentRequestDto);
    }

    @DeleteMapping("/{comment_id}")
    public ResponseEntity deleteComment(@PathVariable Long comment_id)
    {
        return commentService.deleteComment(comment_id);
    }

}
