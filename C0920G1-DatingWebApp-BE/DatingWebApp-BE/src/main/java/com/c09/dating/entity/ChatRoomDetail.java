package com.c09.dating.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "chat_room_detail")
@Getter
@Setter
@NoArgsConstructor
public class ChatRoomDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false,columnDefinition = "INT")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "chatroom_id", referencedColumnName = "id")
    private ChatRoom chatRoom;

    @OneToMany(mappedBy = "chatRoomDetail", cascade = CascadeType.ALL)
    @JsonBackReference(value = "chat_room_detail_message")
    private Set<Message> messageSet ;

}
