package com.JJP.restapiserver.service.stage;

import com.JJP.restapiserver.domain.dto.stage.PostLikeRequestDto;
import com.JJP.restapiserver.domain.entity.stage.PostLike;
import com.JJP.restapiserver.repository.member.MemberRepository;
import com.JJP.restapiserver.repository.stage.PostLikeRepository;
import com.JJP.restapiserver.repository.stage.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostLikeServiceImpl implements PostLikeService{

    private final PostRepository postRepository;

    private final PostLikeRepository postLikeRepository;
    private final MemberRepository memberRepository;

    @Override
    public ResponseEntity like(PostLikeRequestDto postLikeRequestDto) {
        PostLike postLike = PostLike.builder()
                .post(postRepository.getById(postLikeRequestDto.getPost_id()))
                .member(memberRepository.getById(postLikeRequestDto.getUser_id()))
                .build();
        postLikeRepository.save(postLike);
        return new ResponseEntity(HttpStatus.OK);
    }

    @Override
    public ResponseEntity unlike(PostLikeRequestDto postLikeRequestDto) {
        PostLike postLike = postLikeRepository.findByPost_idAndMember_id(
                postLikeRequestDto.getPost_id(), postLikeRequestDto.getUser_id()).get();
        postLikeRepository.delete(postLike);

        return new ResponseEntity(HttpStatus.OK);
    }
}
