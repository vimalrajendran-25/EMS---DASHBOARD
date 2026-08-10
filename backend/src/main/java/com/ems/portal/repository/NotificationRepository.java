package com.ems.portal.repository;

import com.ems.portal.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByUserIdOrUserIdIsNullOrderByTimestampDesc(Long userId);
    List<Notification> findAllByOrderByTimestampDesc();
}
