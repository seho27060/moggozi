package com.JJP.restapiserver.controller.stage;

import com.JJP.restapiserver.domain.dto.SliceListDto;
import com.JJP.restapiserver.domain.dto.post.*;
import com.JJP.restapiserver.domain.entity.stage.Post;
import com.JJP.restapiserver.repository.stage.PostRepository;
import com.JJP.restapiserver.security.JwtUtils;
import com.JJP.restapiserver.service.post.PostService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
//@CrossOrigin("*")
@Tag(name = "PostController", description = "포스팅 API")
@RequiredArgsConstructor
@RequestMapping("/post")
@RestController
public class PostController {

    private final PostService postService;
    private final JwtUtils jwtUtils;
    private final PostRepository postRepository;

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
    @Operation(summary = "member에 따른 최신순 post리스트")
    @GetMapping("/member/{member_id}")
    private ResponseEntity<SliceListDto> memberPostList(@PathVariable Long member_id, Pageable pageable){
        SliceListDto sliceListDto = postService.getMemberPost(member_id, pageable);

        return new ResponseEntity<>(sliceListDto, HttpStatus.OK);
    }

    // stage에 따른 post리스트
    @Operation(summary = "stage에 따른 최신순 post리스트")
    @GetMapping("/{stage_id}")
    private ResponseEntity<SliceListDto> stagePostList(@PathVariable Long stage_id, Pageable pageable){
        SliceListDto sliceListDto = postService.getStagePost(stage_id, pageable);

        return new ResponseEntity<>(sliceListDto, HttpStatus.OK);
    }

    @Operation(summary = "랜덤 갯수 post리스트")
    @GetMapping("/random/{size}")
    private ResponseEntity<List<PostResponseDto>> getRandomListBySize(@PathVariable int size){
        List<PostResponseDto> postResponseDtoList = postService.getRandomPostList(size);
        return new ResponseEntity<>(postResponseDtoList, HttpStatus.OK);
    }

    @Operation(summary = "최근 작성순서에 따른 post리스트")
    @GetMapping("/list/latest")
    private ResponseEntity<SliceListDto> postLatestList(Pageable pageable){
        SliceListDto sliceListDto = postService.latestPostList(pageable);

        return new ResponseEntity<>(sliceListDto, HttpStatus.OK);
    }

    @Operation(summary = "좋아요에 따른 post리스트")
    @GetMapping("/list/like")
    private ResponseEntity<SliceListDto> postLikeList(Pageable pageable){
        SliceListDto sliceListDto = postService.likePostList(pageable);

        return new ResponseEntity<>(sliceListDto, HttpStatus.OK);
    }
}