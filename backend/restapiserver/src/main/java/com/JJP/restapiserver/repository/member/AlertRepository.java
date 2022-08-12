package com.JJP.restapiserver.repository.member;

import com.JJP.restapiserver.domain.entity.member.Alert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface AlertRepository extends JpaRepository<Alert, Long> {
    List<Alert> findTop6ByReceiver_idOrderByCreatedDateDesc(Long receiver_id);
    List<Alert> findByReceiver_id(Long reciever_id);

    @Query(value = "select * from alert as a where a.receiver_id = :receiver_id and a.type = :type and timestampdiff(hour, a.created_date, :now_time) < 12 ", nativeQuery = true)
    List<Alert> findDuplicatedMessage(@Param("receiver_id") Long receiver_id, @Param("type") String type, @Param("now_time")LocalDateTime now);
}
