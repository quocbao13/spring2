package com.c09.dating.controller;
import com.c09.dating.entity.ChatRoom;
import com.c09.dating.entity.User;
import com.c09.dating.repository.UserRepository;
import com.c09.dating.service.ChatRoomService;
import com.c09.dating.service.impl.ChatRoomServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(value = "/api/chatroom")
public class ChatRoomController {

    @Autowired
    ChatRoomServiceImpl chatRoomService;
    @Autowired
    UserRepository userRepository;

    @GetMapping(value = "/user")
    public List<User> getUser() {
        return this.userRepository.findAll();
    }

    @GetMapping("/list")
    public List<ChatRoom> getChatRoom() {
        System.out.println("abc");
        return this.chatRoomService.getAllChatRoom();
    }

}
