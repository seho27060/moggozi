package com.JJP.restapiserver.service.post;

import com.JJP.restapiserver.domain.dto.challenge.Writer;
import com.JJP.restapiserver.domain.dto.member.response.MyPagePostDto;
import com.JJP.restapiserver.domain.dto.post.PostDetailDto;
import com.JJP.restapiserver.domain.dto.post.PostResponseDto;
import com.JJP.restapiserver.domain.dto.post.PostSaveRequestDto;
import com.JJP.restapiserver.domain.dto.post.PostUpdateRequestDto;
import com.JJP.restapiserver.domain.entity.stage.Post;
import com.JJP.restapiserver.repository.member.MemberRepository;
import com.JJP.restapiserver.repository.stage.PostLikeRepository;
import com.JJP.restapiserver.repository.stage.PostRepository;
import com.JJP.restapiserver.repository.stage.StageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


@RequiredArgsConstructor
@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final MemberRepository memberRepository;
    private final StageRepository stageRepository;
    private final PostLikeRepository postLikeRepository;

    @Transactional
    @Override
    public PostResponseDto savePost(PostSaveRequestDto postSaveRequestDto) {
        Post post = postRepository.save(postSaveRequestDto.toEntity(memberRepository.getById(postSaveRequestDto.getMemberId()), stageRepository.getById(postSaveRequestDto.getStageId())));
        return new PostResponseDto(post);
    }

    @Transactional
    @Override
    public PostResponseDto updatePost(PostUpdateRequestDto postUpdateRequestDto) {
        Long post_id = postUpdateRequestDto.getPostId();
        Post entity = postRepository.findById(post_id).orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + post_id));

        entity.update(postUpdateRequestDto.getTitle(), postUpdateRequestDto.getContent(), postUpdateRequestDto.getPostImg());
        PostResponseDto postResponseDto= new PostResponseDto(entity);
        if(postLikeRepository.findByPost_idAndMember_id(postResponseDto.getId(), postResponseDto.getWriter().getId()).isPresent())
        {
            postResponseDto.setLiked(true);
        }
        return postResponseDto;
    }

    @Override
    public void deletePost(Long post_id) {
        Post entity = postRepository.findById(post_id).orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + post_id));

        postRepository.delete(entity);
    }

    @Override
    public List<PostResponseDto> getStagePost(Long stage_id) {
        List<Post> postList = postRepository.findAllByStage_id(stage_id);
        List<PostResponseDto> postResponseDtoList = new ArrayList<>();
        for(int i = 0; i < postList.size(); i++)
        {
            Post post = postList.get(i);
            PostResponseDto postResponseDto = new PostResponseDto(post);
            if(postLikeRepository.findByPost_idAndMember_id(postResponseDto.getId(), postResponseDto.getWriter().getId()).isPresent())
            {
                postResponseDto.setLiked(true);
            }
            postResponseDtoList.add(postResponseDto);
        }
        return postResponseDtoList;
    }

    @Override
    public Long writtenPostNum(Long member_id) {
        return postRepository.countByMember_id(member_id);
    }

    @Override
    public List<PostResponseDto> writtenPostList8(Long member_id) {
        List<Post> postList = postRepository.findTop8ByMember_idOrderByModifiedDateDesc(member_id);
        List<PostResponseDto> postResponseDtoList = new ArrayList<>();
        if(postList != null)
        {
            for(Post post : postList)
            {
                PostResponseDto postResponseDto = new PostResponseDto(post);
                if(postLikeRepository.findByPost_idAndMember_id(postResponseDto.getId(), postResponseDto.getWriter().getId()).isPresent())
                {
                    postResponseDto.setLiked(true);
                }
                postResponseDtoList.add(postResponseDto);
            }
        }
        return postResponseDtoList;
    }

    @Override
    public List<PostResponseDto> getRandomPostList(int size) {
            List<Post> postList = postRepository.findRandomPostList(size);
            List<PostResponseDto> postResponseDtoList = new ArrayList<>();
            if(postList != null){
            for(int i = 0; i < postList.size(); i++)
                postResponseDtoList.add(new PostResponseDto(postList.get(i)));
            }
            return postResponseDtoList;
        }

    @Override
    public List<PostResponseDto> getMemberPost(Long member_id) {
        List<Post> postList = postRepository.findAllByMember_id(member_id);

        List<PostResponseDto> postResponseDtoList = new ArrayList<>();
        for(int i = 0; i < postList.size(); i++)
        {
            Post post = postList.get(i);
            PostResponseDto postResponseDto = new PostResponseDto(post);
            if(postLikeRepository.findByPost_idAndMember_id(postResponseDto.getId(), postResponseDto.getWriter().getId()).isPresent())
            {
                postResponseDto.setLiked(true);
            }
            postResponseDtoList.add(postResponseDto);
        }
        return postResponseDtoList;
    }

    @Override
    public MyPagePostDto infinitePostList(Long member_id, Pageable pageable){
        Slice<Post> challengeSlice = postRepository.findByMember_IdOrderByCreatedDateDesc(member_id, pageable);

        MyPagePostDto myPagePostDto = MyPagePostDto.builder()
                .pageNum(challengeSlice.getNumber())
                .content(challengeSlice.getContent())
                .size(challengeSlice.getSize())
                .hasNext(challengeSlice.hasNext())
                .build();
        return myPagePostDto;
    }

    @Override
    public PostDetailDto detailPost(Long post_id, Long member_id){
        Post post = postRepository.getById(post_id);

        System.out.println("=======================================================");
        System.out.println(post.getId());
        Writer writer = new Writer(post.getMember().getId(), post.getMember().getNickname());
        PostDetailDto postDetailDto = PostDetailDto.builder()
                .id(post_id)
                .title(post.getTitle())
                .content(post.getContent())
                .createdTime(post.getCreatedDate())
                .isLiked(postLikeRepository.findByPost_idAndMember_id(post_id, member_id).isPresent() ? true : false)
                .modifiedTime(post.getModifiedDate())
                .postImg(post.getPostImg())
                .likeNum(post.getPostLikeList().size())
                .writer(writer)
                .build();

        return postDetailDto;
    }
}
