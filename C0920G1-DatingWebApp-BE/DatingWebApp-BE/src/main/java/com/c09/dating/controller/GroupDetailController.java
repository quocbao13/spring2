package com.c09.dating.controller;

import com.c09.dating.DTO.DetailGroupDTO;
import com.c09.dating.DTO.GroupDetailDTO;
import com.c09.dating.DTO.UserGroupDTO;
import com.c09.dating.entity.Group;
import com.c09.dating.entity.GroupDetail;
import com.c09.dating.entity.Post;
import com.c09.dating.entity.User;
import com.c09.dating.repository.GroupDetailRepository;
import com.c09.dating.repository.GroupRepository;
import com.c09.dating.repository.UserRepository;
import com.c09.dating.service.GroupDetailService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "http://localhost:4200")
public class GroupDetailController {
    @Autowired
    GroupDetailService groupDetailService;

    @Autowired
    GroupDetailRepository groupDetailRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    GroupRepository groupRepository;

    @GetMapping(value = "/group/{id}/member")
    public ResponseEntity<List<UserGroupDTO>> getAllUserInGroup(@PathVariable Long id) {
        try {
            List<UserGroupDTO> userGroupDTOS = groupDetailService.getAllUserInGroup(id);
            if (userGroupDTOS.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(userGroupDTOS, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/group/{id}")
    public ResponseEntity<DetailGroupDTO> getGroupById(@PathVariable Long id) {
        DetailGroupDTO detailGroupDTO = groupDetailService.getGroupAndAdminById(id);
        if (detailGroupDTO == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(detailGroupDTO, HttpStatus.OK);
    }

    @DeleteMapping(value = "/group/{idgroup}/out/{iduser}")
    public void outGroup(@PathVariable("iduser") Long idUser, @PathVariable("idgroup") Long idGroup) {
        this.groupDetailService.outGroup(idUser, idGroup);
    }

    @PostMapping(value = "/group/{idgroup}/join/{iduser}")
    public void joinGroup(@PathVariable("iduser") Long idUser, @PathVariable("idgroup") Long idGroup) {
        User user = this.userRepository.findById(idUser).orElse(null);
        Group group = this.groupRepository.findById(idGroup).orElse(null);
        GroupDetail groupDetail = new GroupDetail(user, group);
        this.groupDetailRepository.save(groupDetail);
    }

    @GetMapping(value = "/group/{id}/post")
    public ResponseEntity<List<Post>> getAllPostInGroup(@PathVariable Long id) {
        List<Post> postList = this.groupDetailService.getAllPostInGroup(id);
        if (postList == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(postList, HttpStatus.OK);
    }
}
