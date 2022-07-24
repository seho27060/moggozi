package com.JJP.restapiserver.repository;

import com.JJP.restapiserver.domain.entity.member.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {

}
