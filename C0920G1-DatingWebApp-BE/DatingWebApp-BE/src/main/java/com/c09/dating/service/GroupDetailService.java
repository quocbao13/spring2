package com.c09.dating.service;

import com.c09.dating.DTO.AdminGroupDTO;
import com.c09.dating.DTO.DetailGroupDTO;
import com.c09.dating.DTO.UserGroupDTO;
import com.c09.dating.entity.Group;
import com.c09.dating.entity.Post;

import java.util.List;

public interface GroupDetailService {
    List<UserGroupDTO> getAllUserInGroup(Long id);

    Group getGroupById(Long id);

    AdminGroupDTO getAdminOfGroup(Long id);

    DetailGroupDTO getGroupAndAdminById(Long id);

    void outGroup(Long idUser, Long idGroup);

    void joinGroup(Long idUser, Long idGroup);

    List<Post> getAllPostInGroup(Long id);
}
