package com.JJP.restapiserver.service.post;

import com.JJP.restapiserver.domain.dto.post.PostSaveRequestDto;
import com.JJP.restapiserver.domain.dto.post.PostUpdateRequestDto;
import com.JJP.restapiserver.domain.entity.stage.Post;
import com.JJP.restapiserver.repository.member.MemberRepository;
import com.JJP.restapiserver.repository.stage.PostRepository;
import com.JJP.restapiserver.repository.stage.StageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@RequiredArgsConstructor
@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final MemberRepository memberRepository;
    private final StageRepository stageRepository;

    @Transactional
    @Override
    public Long savePost(PostSaveRequestDto postSaveRequestDto) {
        return postRepository.save(postSaveRequestDto.toEntity(memberRepository.getById(postSaveRequestDto.getMember_id()), stageRepository.getById(postSaveRequestDto.getStage_id()))).getId();
    }

    @Transactional
    @Override
    public Long updatePost(PostUpdateRequestDto postUpdateRequestDto) {
        Long post_id = postUpdateRequestDto.getPost_id();
        Post entity = postRepository.findById(post_id).orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + post_id));

        entity.update(postUpdateRequestDto.getTitle(), postUpdateRequestDto.getContent(), postUpdateRequestDto.getPost_img());

        return post_id;
    }

    @Override
    public void deletePost(Long post_id) {
        Post entity = postRepository.findById(post_id).orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + post_id));

        postRepository.delete(entity);
    }

    @Override
    public List<Post> getStagePost(Long stage_id) {
        return postRepository.findAllByStage_id(stage_id);
    }

    @Override
    public List<Post> getMemberPost(Long member_id) {
        return postRepository.findAllByMember_id(member_id);
    }
}
