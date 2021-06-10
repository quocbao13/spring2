package com.c09.dating.service.impl;
import com.c09.dating.DTO.ListGroupDTO;
import com.c09.dating.DTO.UserAndGroupDTO;
import com.c09.dating.service.GroupService;

import com.c09.dating.entity.Group;
import com.c09.dating.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;

import java.util.List;


import java.time.LocalDate;

@Service
public class GroupServiceImpl implements GroupService {


    @Autowired
    private GroupRepository groupRepository;

    @Override
    public Page<Group> findAllGroups(Pageable pageable) {
        return groupRepository.findAllGroup(pageable);
    }

    @Override
    public Page<ListGroupDTO> findAllGroupsByName(Pageable pageable, String inputSearch) {
        return groupRepository.findAllGroupByName(pageable, inputSearch);
    }

    @Override
    public List<Group> findAllGroup() {
        return groupRepository.findAll();
    }

    @Override
    public void deleteGroup(Long id) {
        this.groupRepository.deleteById(id);
    }

    @Override
    public Group findById(long id) {
        return groupRepository.findById(id);
    }

    @Override
    public Group saveGroup(Group group) {
        group.setStartDate(LocalDate.now());
        return groupRepository.save(group);
    }

    @Override
    public Group findByGroupId(Long groupId) {
        return groupRepository.findById(groupId).orElse(null);
    }


    //khoa
    @Override
    public List<UserAndGroupDTO> findAllGroupUserByNameContain(String name,Integer page) {
        return groupRepository.findAllGroupUserByNameContain(name,page);
    }


}
