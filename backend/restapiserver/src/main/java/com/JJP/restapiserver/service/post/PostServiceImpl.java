package com.JJP.restapiserver.service.post;

import com.JJP.restapiserver.domain.dto.challenge.Writer;
import com.JJP.restapiserver.domain.dto.SliceListDto;
import com.JJP.restapiserver.domain.dto.post.*;
import com.JJP.restapiserver.domain.dto.stage.StageCompleteDto;
import com.JJP.restapiserver.domain.entity.challenge.Challenge;
import com.JJP.restapiserver.domain.entity.challenge.JoinedChallenge;
import com.JJP.restapiserver.domain.entity.stage.Post;
import com.JJP.restapiserver.domain.entity.stage.Stage;
import com.JJP.restapiserver.domain.entity.stage.StageUser;
import com.JJP.restapiserver.repository.challenge.JoinedChallengeRepository;
import com.JJP.restapiserver.repository.member.MemberRepository;
import com.JJP.restapiserver.repository.stage.PostLikeRepository;
import com.JJP.restapiserver.repository.stage.PostRepository;
import com.JJP.restapiserver.repository.stage.StageRepository;
import com.JJP.restapiserver.repository.stage.StageUserRepository;
import com.JJP.restapiserver.service.stage.StageJoinService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;


@RequiredArgsConstructor
@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final MemberRepository memberRepository;
    private final StageRepository stageRepository;
    private final StageUserRepository stageUserRepository;
    private final PostLikeRepository postLikeRepository;
    private final JoinedChallengeRepository joinedChallengeRepository;

    private final StageJoinService stageJoinService;

    @Transactional
    @Override
    public Long savePost(PostSaveRequestDto postSaveRequestDto, Long member_id) {
        Post post = postRepository.findByStage_idAndMember_Id(postSaveRequestDto.getStageId(), member_id);
        Long stage_id = postSaveRequestDto.getStageId();
        Stage stage =  stageRepository.getById(stage_id);
        Challenge challenge = stage.getChallenge();
        JoinedChallenge joinedChallenge = joinedChallengeRepository.findByChallenge_idAndMember_id(challenge.getId(), member_id).get();
        int stage_num = challenge.getStageList().size();
        Optional<StageUser> userState = stageUserRepository.findByMember_idAndStage_id(member_id, stage_id);
        // 포스트가 등록이 되면 유저가 참여중인 스테이지의 상태를 완료(2)로 바꿈
        if(userState.isPresent()){
            stageJoinService.changeStageState(new StageCompleteDto(userState.get().getMember().getId(),
                    userState.get().getStage().getId()), 2);
//            userState.get(). setState(2);
        }
        // 그 다음에 만약 포스트의 개수가 챌린지의 스테이트 개수와 같다면, 조인드 챌린지의 상태를 2로 바꿔야함.
        int post_num = postRepository.countByMember_idAndStage_id(member_id, stage_id);
        if(post_num + 1 == stage_num){
            joinedChallenge.setState(2);
        }
        if(post != null){
            return (long) -1;
        }

        return postRepository.save(postSaveRequestDto.toEntity(memberRepository.getById(member_id), stageRepository.getById(postSaveRequestDto.getStageId()))).getId();
    }

    @Transactional
    @Override
    public int updatePost(PostUpdateRequestDto postUpdateRequestDto, Long member_id) {
        Long post_id = postUpdateRequestDto.getPostId();
        Post entity = postRepository.findById(post_id).orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + post_id));

        if(!Objects.equals(entity.getMember().getId(), member_id)){
            return -1;
        }

        entity.update(postUpdateRequestDto.getTitle(), postUpdateRequestDto.getContent());
        PostResponseDto postResponseDto= new PostResponseDto(entity);
        if(postLikeRepository.findByPost_idAndMember_id(postResponseDto.getId(), postResponseDto.getWriter().getId()).isPresent())
        {
            postResponseDto.setLiked(true);
        }
        return 1;
    }

    @Override
    public void deletePost(Long post_id) {
        Post entity = postRepository.findById(post_id).orElseThrow(() -> new IllegalArgumentException("해당 게시글이 없습니다. id=" + post_id));

        postRepository.delete(entity);
    }

    @Override
    public SliceListDto getStagePost(Long stage_id, Pageable pageable) {
        Page<Post> postList = postRepository.findAllByStage_idOrderByCreatedDateDesc(stage_id, pageable);
        return getSliceListDto(postList);
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
                for (Post post : postList) postResponseDtoList.add(new PostResponseDto(post));
            }
            return postResponseDtoList;
        }

    @Override
    public SliceListDto getMemberPost(Long member_id, Pageable pageable) {
        Page<Post> postList = postRepository.findAllByMember_idOrderByCreatedDateDesc(member_id, pageable);

        return getSliceListDto(postList);
    }

    private SliceListDto getSliceListDto(Page<Post> postList) {
        List<PostResponseDto> postResponseDtoList = new ArrayList<>();
        for(int i = 0; i < postList.getNumberOfElements(); i++)
        {
            Post post = postList.getContent().get(i);
            PostResponseDto postResponseDto = new PostResponseDto(post);
            if(postLikeRepository.findByPost_idAndMember_id(postResponseDto.getId(), postResponseDto.getWriter().getId()).isPresent())
            {
                postResponseDto.setLiked(true);
            }
            postResponseDtoList.add(postResponseDto);
        }

        return SliceListDto.builder()
                .totalPages(postList.getTotalPages())
                .totalElements(postList.getTotalElements())
                .pageNum(postList.getNumber())
                .content(postResponseDtoList)
                .size(postList.getNumberOfElements())
                .hasNext(postList.hasNext())
                .build();
    }

    @Override
    public SliceListDto infinitePostList(Long member_id, Pageable pageable){
        Slice<Post> challengeSlice = postRepository.findByMember_IdOrderByCreatedDateDesc(member_id, pageable);
        List<Post> postList = challengeSlice.toList();
        List<PostResponseDto> postResponseDtoList = postList.stream().map(PostResponseDto::new).collect(Collectors.toList());

        return SliceListDto.builder()
                .pageNum(challengeSlice.getNumber())
                .content(postResponseDtoList)
                .size(challengeSlice.getSize())
                .hasNext(challengeSlice.hasNext())
                .build();
    }

    @Override
    public PostDetailDto detailPost(Long post_id, Long member_id){
        Post post = postRepository.getById(post_id);
        boolean like;

        Writer writer = new Writer(post.getMember().getId(), post.getMember().getNickname(), post.getMember().getUser_img());

        if(member_id == null){
            like = false;
        } else{
            like = postLikeRepository.findByPost_idAndMember_id(post_id, member_id).isPresent();
        }

        return PostDetailDto.builder()
                .id(post_id)
                .title(post.getTitle())
                .content(post.getContent())
                .createdTime(post.getCreatedDate())
                .isLiked(like)
                .modifiedTime(post.getModifiedDate())
                .postImg(post.getPostImg())
                .likeNum(post.getPostLikeList().size())
                .writer(writer)
                .build();
    }

    @Override
    public Object detailMemberPost(Long stage_id, Long member_id){
        Post post = postRepository.findByStage_idAndMember_Id(stage_id, member_id);

        if(post == null){
            return -1;
        }

        Writer writer = new Writer(member_id, post.getMember().getNickname(), post.getMember().getUser_img());

        return PostDetailDto.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .createdTime(post.getCreatedDate())
                .isLiked(postLikeRepository.findByPost_idAndMember_id(post.getId(), member_id).isPresent())
                .modifiedTime(post.getModifiedDate())
                .postImg(post.getPostImg())
                .likeNum(post.getPostLikeList().size())
                .writer(writer)
                .build();
    }

    @Override
    public SliceListDto latestPostList(Pageable pageable){
        Page<Post> postList = postRepository.findAllByOrderByCreatedDateDesc(pageable);

        return getSliceListDto(postList);
    }

    @Override
    public SliceListDto likePostList(Pageable pageable){
        Page<Post> postList = postRepository.findAllByOrderByLikeNumDesc(pageable);

        return getSliceListDto(postList);
    }
}
