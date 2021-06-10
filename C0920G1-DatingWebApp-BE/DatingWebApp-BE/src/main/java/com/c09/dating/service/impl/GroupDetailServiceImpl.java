package com.c09.dating.service.impl;

import com.c09.dating.DTO.AdminGroupDTO;
import com.c09.dating.DTO.DetailGroupDTO;
import com.c09.dating.DTO.UserGroupDTO;
import com.c09.dating.entity.Group;
import com.c09.dating.entity.Post;
import com.c09.dating.entity.User;
import com.c09.dating.repository.GroupDetailRepository;
import com.c09.dating.repository.GroupRepository;
import com.c09.dating.repository.UserRepository;
import com.c09.dating.service.GroupDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GroupDetailServiceImpl implements GroupDetailService {
    @Autowired
    GroupDetailRepository groupDetailRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    GroupRepository groupRepository;

    @Override
    public List<UserGroupDTO> getAllUserInGroup(Long id) {
        List<User> users = this.groupDetailRepository.getAllUserInGroup(id);
        List<UserGroupDTO> userGroupDTOS = new ArrayList<>();
        for (User user : users) {
            UserGroupDTO userGroupDTO = new UserGroupDTO(user.getId(), user.getFullName(), user.getAvatar());
            userGroupDTOS.add(userGroupDTO);
        }
        return userGroupDTOS;
    }

    @Override
    public Group getGroupById(Long id) {
        return this.groupRepository.findById(id).orElse(null);
    }

    @Override
    public AdminGroupDTO getAdminOfGroup(Long id) {
        User user = this.groupDetailRepository.getAdminOfGroup(id);
        return new AdminGroupDTO(user.getId(), user.getFullName(), user.getPhone(), user.getAvatar());
    }

    @Override
    public DetailGroupDTO getGroupAndAdminById(Long id) {
        Group group = this.groupRepository.findById(id).orElse(null);
        User user = this.groupDetailRepository.getAdminOfGroup(id);
        AdminGroupDTO adminGroupDTO = new AdminGroupDTO(user.getId(), user.getFullName(), user.getPhone(), user.getAvatar());
        return new DetailGroupDTO(adminGroupDTO, group);
    }

    @Override
    public void outGroup(Long idUser, Long idGroup) {
        this.groupDetailRepository.outGroup(idUser, idGroup);
    }

    @Override
    public void joinGroup(Long idUser, Long idGroup) {
        this.groupDetailRepository.joinGroup(idUser, idGroup);
    }

    @Override
    public List<Post> getAllPostInGroup(Long id) {
        return this.groupDetailRepository.getAllPostInGroup(id);
    }
}
