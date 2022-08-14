package com.JJP.restapiserver.repository.challenge;

import com.JJP.restapiserver.domain.entity.challenge.Challenge;
import com.JJP.restapiserver.domain.entity.stage.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {

//    @Override
//    Challenge save(Challenge challenge){
//        challenge.setZeroLikeNum();
//        return (challenge);
//    }
    // 테스트 작성 완료
    // 챌린지 Entity에서 필드명 hobby로 검색하여 해당 리스트를 반환함
    @Query("select m from Challenge m inner join ChallengeTag t on m.id = t.challenge " +
            "inner join Tag a on a.id = t.tag " +
            "where a.tag = :hobby")
    List<Challenge> findByHobby(@Param("hobby") String hobby);

//    List<Challenge>

    // 테스트 작성 완료
    // 챌린지 이름이 키워드를 포함하고 있는지 검색하여 해당 리스트를 반환함
    Page<Challenge> findByStateAndNameContaining(int state, String keyword, Pageable pageable);


    Page<Challenge> findByStateOrderByLikeNumDesc(int state, Pageable pageable);

    // 챌린지 번호로 상세정보 얻어오기
    @Override
    Optional<Challenge> findById(Long id);

//    Page<Challenge> findByMember_id
    // save, update, delete 메소드는 이미 있음

    Page<Challenge> findByStateAndIdIn(int state, List<Long> ids, Pageable pageable);

    List<Challenge> findByStateAndIdIn(int state, List<Long> ids);

    Page<Challenge> findByMember_idOrderByModifiedDate(Long member_id, Pageable pageable);

    @Query(value = "SELECT * FROM challenge where state = 1 order by RAND() LIMIT :size", nativeQuery = true)
    List<Challenge> findRandomChallengeList(@Param("size") int size);

    // 참여하지 않은 챌린지 중에 좋아요가 가장 많은 api
    @Query(value = "select a.id from challenge as a inner join challenge_tag as t on t.challenge_id = a.id where a.id not in :joined_ids and t.tag_id = :tag_id order by a.like_num desc limit 1"
            ,nativeQuery = true)
    List<Object[]> findUnJoinedChallenge(@Param("joined_ids") List<Long> joined_ids, @Param("tag_id") Long tag_id);

    @Query(value = "select * from challenge c inner join challenge_tag t on c.id = t.challenge_id where t.tag_id = :tag_ids and c.state = 1", nativeQuery = true)
    List<Challenge> findChallengeContainsTag(@Param("tag_ids") Long tag_ids);

    Optional<Challenge> findByMember_idAndId(Long member_id, Long challenge_id);

    Page<Challenge> findAllByOrderByCreatedDateDesc(Pageable pageable);
}
