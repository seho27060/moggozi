package com.JJP.restapiserver.repository.challenge;

import com.JJP.restapiserver.domain.entity.challenge.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    // 테스트 작성 완료
    // 챌린지 Entity에서 필드명 hobby로 검색하여 해당 리스트를 반환함
    @Query("select m from Challenge m inner join ChallengeTag t on m.id = t.challenge " +
            "inner join Tag a on a.id = t.tag " +
            "where a.tag = :hobby")
    List<Challenge> findByHobby(@Param("hobby") String hobby);

    // 테스트 작성 완료
    // 챌린지 이름이 키워드를 포함하고 있는지 검색하여 해당 리스트를 반환함
    List<Challenge> findByNameContaining(String keyword);

    @Query(value = "select a.id, count(*) from challenge as a inner join challenge_like b on a.id = b.challenge_id group by a.ID order by count(*) desc limit 5"
    ,nativeQuery = true)
    List<Object[]> findByLike();

    // 챌린지 번호로 상세정보 얻어오기
    @Override
    Optional<Challenge> findById(Long id);

    // save, update, delete 메소드는 이미 있음




}
