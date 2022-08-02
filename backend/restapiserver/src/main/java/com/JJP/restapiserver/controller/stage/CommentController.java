package com.JJP.restapiserver.controller.stage;

import com.JJP.restapiserver.domain.dto.CommentRequestDto;
import com.JJP.restapiserver.domain.entity.stage.Comment;
import com.JJP.restapiserver.service.stage.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/comment")
@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @GetMapping("/stage/{stage_id}")
    public ResponseEntity getStageCommentList(Long stage_id)
    {
        List<Comment> commentList = commentService.getStageCommentList(stage_id);
        return new ResponseEntity(commentList, HttpStatus.OK);
    }

    @GetMapping("/user/{user_id}")
    public ResponseEntity getMyCommentList(Long user_id){
        List<Comment> commentList =  commentService.getMyCommentList(user_id);
        return new ResponseEntity(commentList, HttpStatus.OK);
    }

    @PostMapping("/comment/register")
    public ResponseEntity registerComment(@RequestBody CommentRequestDto commentRequestDto)
    {
        return commentService.registerComment(commentRequestDto);
    }

    @PutMapping("/comment/{comment_id}")
    public ResponseEntity updateComment(@PathVariable Long comment_id, @RequestBody CommentRequestDto commentRequestDto)
    {
        return commentService.updateComment(comment_id, commentRequestDto);
    }

    @DeleteMapping("/comment/{comment_id}")
    public ResponseEntity deleteComment(@PathVariable Long comment_id)
    {
        return commentService.deleteComment(comment_id);
    }

}
