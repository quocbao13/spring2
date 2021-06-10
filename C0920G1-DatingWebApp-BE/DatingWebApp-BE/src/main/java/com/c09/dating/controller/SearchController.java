package com.c09.dating.controller;

import com.c09.dating.DTO.UserAndGroupDTO;
import com.c09.dating.entity.User;
import com.c09.dating.service.GroupService;
import com.c09.dating.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class SearchController {
    @Autowired
    private UserService userService;
    @Autowired
    private GroupService groupService;

    //khoa
    @GetMapping(value = "/api/search/list-user")
    public ResponseEntity<List<UserAndGroupDTO>> getAllUserByName(@RequestParam String name, @RequestParam Integer page) {
        try {
            List<UserAndGroupDTO> userAndGroupDTOList = userService.findAllUserByNameContain(name, page);
            if (userAndGroupDTOList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(userAndGroupDTOList, HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/api/search/list-group")
    public ResponseEntity<List<UserAndGroupDTO>> getAllGroupByName(@RequestParam String name, @RequestParam Integer page) {
        try {
            List<UserAndGroupDTO> userAndGroupDTOList = groupService.findAllGroupUserByNameContain(name, page);
            if (userAndGroupDTOList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(userAndGroupDTOList, HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/api/search/list-user-group")
    public ResponseEntity<List<UserAndGroupDTO>> getAllUserAndGroupByName(@RequestParam String name, @RequestParam Integer page) {
        try {
            List<UserAndGroupDTO> userAndGroupDTOList = userService.findAllUserAndGroupByNameContain(name, page);
            if (userAndGroupDTOList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(userAndGroupDTOList, HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/api/search/list-user-advanced")
    public ResponseEntity<List<UserAndGroupDTO>> getAllUserAdvanced(@RequestParam String name,
                                                                    @RequestParam String gender,
                                                                    @RequestParam String address,
                                                                    @RequestParam String job,
                                                                    @RequestParam String startAge,
                                                                    @RequestParam String endAge,
                                                                    @RequestParam String hobby,
                                                                    @RequestParam Integer page) {
        if (startAge == ""){
            startAge = "1950";
        }
        if (endAge == ""){
            endAge = String.valueOf(Calendar.getInstance().get(Calendar.YEAR));
        }
        try {
            List<UserAndGroupDTO> userAndGroupDTOList = userService.findAllUserAdvanced(name, gender, address, job, startAge, endAge, hobby, page);
            if (userAndGroupDTOList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(userAndGroupDTOList, HttpStatus.OK);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
