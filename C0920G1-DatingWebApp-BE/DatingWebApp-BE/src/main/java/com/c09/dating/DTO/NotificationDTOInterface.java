package com.c09.dating.DTO;

import java.time.LocalDate;

public interface NotificationDTOInterface {
    Long getNotificationId();
    String getContent();
    LocalDate getTime();
}
