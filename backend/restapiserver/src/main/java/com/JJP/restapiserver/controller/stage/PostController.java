package com.JJP.restapiserver.controller.stage;

import com.JJP.restapiserver.domain.dto.post.PostDetailDto;
import com.JJP.restapiserver.domain.dto.post.PostResponseDto;
import com.JJP.restapiserver.domain.dto.post.PostSaveRequestDto;
import com.JJP.restapiserver.domain.dto.post.PostUpdateRequestDto;
import com.JJP.restapiserver.security.JwtUtils;
import com.JJP.restapiserver.service.post.PostService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
//@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/post")
@RestController
public class PostController {

    private final PostService postService;
    private final JwtUtils jwtUtils;

    // post 글 쓰기
    @Operation(summary = "포스트 등록", description = "이미 스테이지에 글 쓰면 -1, 성공시 post_id를 return")
    @PostMapping
    private Long save(@RequestBody PostSaveRequestDto postSaveRequestDto, HttpServletRequest request){
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));

        return postService.savePost(postSaveRequestDto, member_id);
    }

    // post detail 받기
    @Operation(summary = "포스트 상세정보 받아오기", description = "로그인한 사용자 기반으로 포스팅 상세정보 가져오기(좋아요 때문에 로그인 안하면 error)")
    @GetMapping("/detail/{post_id}")
    private PostDetailDto list(@PathVariable Long post_id, HttpServletRequest request){
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));

        return postService.detailPost(post_id, member_id);
    }

    // 사용자가 작성한 stage의 post 정보 조회
    @Operation(summary = "stage에 따른 로그인한 사용자의 post 상세정보", description = "사용자가 스테이지에 글을 안썼으면 -1, 글 썼으면 상세정보 return")
    @GetMapping("/detail/stage/{stage_id}")
    private Object memberPost(@PathVariable Long stage_id, HttpServletRequest request){
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));

        return postService.detailMemberPost(stage_id, member_id);
    }

    // post 글 수정
    @Operation(summary = "post 글 수정", description = "글 수정 실패시 -1, 성공시 1 return")
    @PutMapping
    private int update(@RequestBody PostUpdateRequestDto postUpdateRequestDto, HttpServletRequest request){
        Long member_id = jwtUtils.getUserIdFromJwtToken(request.getHeader("Authorization"));

        return postService.updatePost(postUpdateRequestDto, member_id);
    }

    // psot 글 삭제
    @Operation(summary = "post 글 삭제", description = "삭제한 포스트 id return")
    @DeleteMapping("/{post_id}")
    private Long delete(@PathVariable Long post_id){
        postService.deletePost(post_id);
        return post_id;
    }

    // member에 따른 post리스트
    @Operation(summary = "member에 따른 post리스트")
    @GetMapping("/member/{member_id}")
    private List<PostResponseDto> memberPostList(@PathVariable Long member_id){
        return postService.getMemberPost(member_id);
    }

    // stage에 따른 post리스트
    @Operation(summary = "stage에 따른 post리스트")
    @GetMapping("/{stage_id}")
    private List<PostResponseDto> stagePostList(@PathVariable Long stage_id){
        return postService.getStagePost(stage_id);
    }

    @GetMapping("/random/{size}")
    private ResponseEntity getRandomListBySize(@PathVariable int size){
        List<PostResponseDto> postResponseDtoList = postService.getRandomPostList(size);
        return new ResponseEntity(postResponseDtoList, HttpStatus.OK);
    }
}
