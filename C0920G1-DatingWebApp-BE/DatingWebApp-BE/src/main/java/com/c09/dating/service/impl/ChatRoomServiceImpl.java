package com.c09.dating.service.impl;

import com.c09.dating.entity.ChatRoom;
import com.c09.dating.repository.ChatRoomRepository;
import com.c09.dating.service.ChatRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatRoomServiceImpl implements ChatRoomService {
    @Autowired
    ChatRoomRepository chatRoomRepository;

    @Override
    public List<ChatRoom> getAllChatRoom() {
        return chatRoomRepository.findAll();
    }
}
