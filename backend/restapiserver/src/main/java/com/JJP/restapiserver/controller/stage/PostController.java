package com.JJP.restapiserver.controller.stage;

import com.JJP.restapiserver.domain.dto.post.PostSaveRequestDto;
import com.JJP.restapiserver.domain.dto.post.PostUpdateRequestDto;
import com.JJP.restapiserver.domain.entity.stage.Post;
import com.JJP.restapiserver.service.post.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/stage/post")
@RestController
public class PostController {

    private final PostService postService;

    @PostMapping
    private Long save(@RequestBody PostSaveRequestDto postSaveRequestDto){
        return postService.savePost(postSaveRequestDto);
    }

    @PutMapping
    private Long update(@RequestBody PostUpdateRequestDto postUpdateRequestDto){
        return postService.updatePost(postUpdateRequestDto);
    }

    @DeleteMapping("/{post_id}")
    private Long delete(@PathVariable Long post_id){
        postService.deletePost(post_id);
        return post_id;
    }

    @GetMapping("/member/{member_id}")
    private List<Post> memberPostList(@PathVariable Long member_id){
        return postService.getMemberPost(member_id);
    }

    @GetMapping("/{stage_id}")
    private List<Post> stagePostList(@PathVariable Long stage_id){
        return postService.getStagePost(stage_id);
    }
}
