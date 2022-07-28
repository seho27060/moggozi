package com.JJP.restapiserver.repository.Tag;

import com.JJP.restapiserver.domain.entity.Tag.ChallengeTag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChallengeTagRepository extends JpaRepository<ChallengeTag, Long> {

    boolean existsByChallenge_idAndTag(Long challenge_id, String tag);
}
