package com.c09.dating.repository;

import com.c09.dating.entity.ChatRoomDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRoomDetailRepository extends JpaRepository<ChatRoomDetail,Long> {
}
