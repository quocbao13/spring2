package com.c09.dating.service;


import com.c09.dating.entity.ChatRoom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ChatRoomService{
    List<ChatRoom> getAllChatRoom();
}
