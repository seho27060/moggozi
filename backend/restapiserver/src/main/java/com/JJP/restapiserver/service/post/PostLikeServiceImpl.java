package com.JJP.restapiserver.service.post;

import com.JJP.restapiserver.domain.dto.stage.PostLikeRequestDto;
import com.JJP.restapiserver.domain.entity.stage.Post;
import com.JJP.restapiserver.domain.entity.stage.PostLike;
import com.JJP.restapiserver.repository.member.MemberRepository;
import com.JJP.restapiserver.repository.stage.PostLikeRepository;
import com.JJP.restapiserver.repository.stage.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class PostLikeServiceImpl implements PostLikeService{

    private final PostRepository postRepository;

    private final PostLikeRepository postLikeRepository;
    private final MemberRepository memberRepository;

    @Override
    public ResponseEntity like(PostLikeRequestDto postLikeRequestDto, Long member_id) {
        Optional<PostLike> postLikeOptional = postLikeRepository.findByPost_idAndMember_id(
                postLikeRequestDto.getPostId(), member_id);
        if(postLikeOptional.isPresent()) {
            return new ResponseEntity(HttpStatus.OK);
        }
        else {
            Post exisitingPost = postRepository.getById(postLikeRequestDto.getPostId());
            postLikeRepository.save(PostLike.builder()
                    .member(memberRepository.getById(member_id))
                    .post(exisitingPost)
                    .build());
            exisitingPost.addLikeNum();
        }
        return new ResponseEntity(HttpStatus.OK);
    }

}
