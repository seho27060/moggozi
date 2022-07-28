package com.JJP.restapiserver.repository.challenge;

import com.JJP.restapiserver.domain.entity.challenge.Challenge;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ChallengeRepository extends JpaRepository<Challenge, Long> {
    // 테스트 작성 완료
    // 챌린지 Entity에서 필드명 hobby로 검색하여 해당 리스트를 반환함
    List<Challenge> findByHobby(String hobby);

    // 테스트 작성 완료
    // 챌린지 이름이 키워드를 포함하고 있는지 검색하여 해당 리스트를 반환함
    List<Challenge> findByNameContaining(String keyword);

    @Query(value = "select ID, count(*) from Challenge as a inner join ChallengeLike b on a.ID = b.CHALLENGE_ID group by a.ID order by count(*) desc limit 5"
    ,nativeQuery = true)
    List<Object[]> findByLike();

    // 챌린지 번호로 상세정보 얻어오기
    @Override
    Optional<Challenge> findById(Long id);

    // save, update, delete 메소드는 이미 있음




}
