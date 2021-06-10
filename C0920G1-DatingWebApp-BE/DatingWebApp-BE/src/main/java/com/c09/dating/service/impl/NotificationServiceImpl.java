package com.c09.dating.service.impl;

import com.c09.dating.DTO.NotificationDTO;
import com.c09.dating.DTO.NotificationDTOInterface;
import com.c09.dating.repository.NotificationRepository;
import com.c09.dating.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationServiceImpl implements NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    /**
     * Dương Nguyên Bảo
     */
    @Override
    public void createFriendNotification(NotificationDTO notificationDTO) {
        notificationRepository.createFriendNotification(
                notificationDTO.getContent(),
                notificationDTO.getTime(),
                notificationDTO.getUserId());
    }
    @Override
    public List<NotificationDTOInterface> showFriendRequestNotification(Long id) {
        return notificationRepository.showFriendRequestNotification(id);
    }
    /**************Hết*************/
}
