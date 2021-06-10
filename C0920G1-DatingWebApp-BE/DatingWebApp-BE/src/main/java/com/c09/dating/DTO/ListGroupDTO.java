package com.c09.dating.DTO;


import com.c09.dating.entity.User;

import java.time.LocalDate;

//Thế Anh tạo DTO List group
public interface ListGroupDTO {
    Long getId();

    String getName();

    String getBackgroundGroup();

    Boolean getDeleteFlag();

    int getCountUser();


    void setUser(User userId);

    void setDeleteFlag(boolean deleteFlag);

    void setStartDate(LocalDate now);
}

