package com.c09.dating.repository;

import com.c09.dating.DTO.NotificationDTO;
import com.c09.dating.DTO.NotificationDTOInterface;
import com.c09.dating.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification,Long> {
    /****************Dương Nguyên Bảo****************/
    /**
     * Tạo thông báo lời mời kết bạn
     * Dương Nguyên Bảo
     */
    @Modifying
    @Transactional
    @Query(value = "insert into notification (content, `time`, user_id)" +
            "values (?1, ?2, ?3)",
            nativeQuery = true)
    void createFriendNotification(String content, LocalDate time, Long userId);
    /**
     * Hiện thông báo lời mời kết bạn
     * Dương Nguyên Bảo
     */
    @Query(value = "select distinct notification.id as notificationId, notification.content, notification.time " +
            "from notification " +
            "join relationship " +
            "where notification.user_id = relationship.user_id " +
            "and notification.user_id = ?1 " +
            "and relationship.status_id = 4",
            nativeQuery = true)
    List<NotificationDTOInterface> showFriendRequestNotification(Long id);
    /****************Hết****************/
}
