package com.c09.dating.service;

import com.c09.dating.DTO.NotificationDTO;
import com.c09.dating.DTO.NotificationDTOInterface;

import java.util.List;

public interface NotificationService {
    /*************Dương Nguyên Bảo*************/
    void createFriendNotification(NotificationDTO notificationDTO);
    List<NotificationDTOInterface> showFriendRequestNotification(Long id);
    /*************Hết*************/
}
