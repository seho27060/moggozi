package com.JJP.restapiserver.repository.member;

import com.JJP.restapiserver.domain.entity.member.MemberScore;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberScoreRepository  extends JpaRepository<MemberScore, Long> {
}
