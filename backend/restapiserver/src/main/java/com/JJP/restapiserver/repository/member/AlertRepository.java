package com.JJP.restapiserver.repository.member;

import com.JJP.restapiserver.domain.entity.member.Alert;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlertRepository extends JpaRepository<Alert, Long> {
    List<Alert> findTop6ByReceiver_idOrderByCreatedDateDesc(Long receiver_id);
    List<Alert> findByReceiver_id(Long reciever_id);
}
