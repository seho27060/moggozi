package com.JJP.restapiserver.repository.Tag;

import com.JJP.restapiserver.domain.entity.Tag.ChallengeTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChallengeTagRepository extends JpaRepository<ChallengeTag, Long> {

    List<ChallengeTag> findByTag_idIn(List<Long> ids);
    boolean existsByChallenge_idAndTag(Long challenge_id, String tag);
}
