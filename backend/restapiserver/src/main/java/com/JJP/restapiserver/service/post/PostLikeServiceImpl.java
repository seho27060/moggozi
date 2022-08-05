package com.JJP.restapiserver.service.post;

import com.JJP.restapiserver.domain.dto.stage.PostLikeRequestDto;
import com.JJP.restapiserver.domain.entity.stage.PostLike;
import com.JJP.restapiserver.repository.member.MemberRepository;
import com.JJP.restapiserver.repository.stage.PostLikeRepository;
import com.JJP.restapiserver.repository.stage.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostLikeServiceImpl implements PostLikeService{

    private final PostRepository postRepository;

    private final PostLikeRepository postLikeRepository;
    private final MemberRepository memberRepository;

    @Override
    public ResponseEntity like(PostLikeRequestDto postLikeRequestDto) {
        PostLike postLike = PostLike.builder()
                .post(postRepository.getById(postLikeRequestDto.getPostId()))
                .member(memberRepository.getById(postLikeRequestDto.getMemberId()))
                .build();
        Optional<PostLike> postLikeOptional = postLikeRepository.findByPost_idAndMember_id(
                postLikeRequestDto.getPostId(), postLikeRequestDto.getMemberId());
        if(postLikeOptional.isPresent()) {
            postLikeRepository.delete(postLikeOptional.get());
        }
        else {
            postLikeRepository.save(PostLike.builder()
                    .member(memberRepository.getById(postLikeRequestDto.getMemberId()))
                    .post(postRepository.getById(postLikeRequestDto.getPostId()))
                    .build());
        }
        return new ResponseEntity(HttpStatus.OK);
    }

}
