package com.c09.dating.controller;


import com.c09.dating.DTO.ListGroupDTO;
import com.c09.dating.entity.Group;
import com.c09.dating.entity.User;
import com.c09.dating.repository.GroupRepository;
import com.c09.dating.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/group")
@CrossOrigin(origins = "http://localhost:4200")
public class GroupController {

    @Autowired
    private GroupService groupService;

    @Autowired
    private GroupRepository groupRepository;

    //Thế Anh lấy list danh sách nhóm
    @GetMapping(value = "/list", params = {"page", "size"})
    public ResponseEntity<Page<Group>> listGroup(@RequestParam("page") int page,
                                                        @RequestParam("size") int size) {
        try {
            Page<Group> groups;
            groups = groupService.findAllGroups(PageRequest.of(page, size));

            if (groups.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(groups, HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Thế Anh tìm kiếm nhóm theo tên
    @GetMapping(value = "/list", params = {"size", "inputSearch"})
    public ResponseEntity<Page<ListGroupDTO>> listGroupByName(
            @RequestParam("inputSearch") String inputSearch, @RequestParam("size") int size) {
        try {
            Page<ListGroupDTO> groups = groupService.findAllGroupsByName(PageRequest.of(0, size), inputSearch);
            if (groups.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(groups, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Linh : tạo nhóm mới
    @PostMapping("/add/{userId}")
    public ResponseEntity<Void> createNewGroup(@RequestBody Group group, @PathVariable("userId") User userId) {
        try {
            group.setUser(userId);
            group.setDeleteFlag(true);
            groupService.saveGroup(group);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Thế anh xóa nhóm xóa hẳn trong database
    @DeleteMapping("/delete-group/{id}")
    public void deleteGroup(@PathVariable(value = "id") long id) {
        groupService.deleteGroup(id);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET, produces = {MediaType.APPLICATION_JSON_VALUE})
    public ResponseEntity<Group> getGroupById(@PathVariable Long id) {
        Group group = groupService.findById(id);
        if (group == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(group, HttpStatus.OK);
    }

    //Thế anh xóa nhóm dùng biến delete flag để tạm ẩn nhóm
    @GetMapping(value = "/delete/{id}")
    public ResponseEntity<Void> changeStatus(@PathVariable(value = "id") Long id) {
        try {
            Group group = groupService.findById(id);

            if (group.getDeleteFlag()) {
                group.setDeleteFlag(false);
                groupRepository.save(group);
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}