package com.JJP.restapiserver.repository;

import com.JJP.restapiserver.domain.entity.member.Alert;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlertRepository extends JpaRepository<Alert, Long> {
}
