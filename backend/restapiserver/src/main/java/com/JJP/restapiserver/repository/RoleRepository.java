package com.JJP.restapiserver.repository;

import com.JJP.restapiserver.domain.entity.member.ERole;
import com.JJP.restapiserver.domain.entity.member.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
