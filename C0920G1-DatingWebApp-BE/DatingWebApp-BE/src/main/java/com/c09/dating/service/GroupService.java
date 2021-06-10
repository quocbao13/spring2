package com.c09.dating.service;

import com.c09.dating.DTO.ListGroupDTO;
import com.c09.dating.DTO.UserAndGroupDTO;
import com.c09.dating.entity.Group;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface GroupService {
//    Thế Anh
    Page<Group> findAllGroups(Pageable pageable);

    //khoa
    List<UserAndGroupDTO> findAllGroupUserByNameContain(String name,Integer page);


    Group saveGroup(Group group);

    Group findByGroupId(Long groupId);


    Page<ListGroupDTO> findAllGroupsByName(Pageable pageable,String inputSearch);


    List<Group> findAllGroup();

    void deleteGroup(Long id);

    Group findById(long id);


}
