package com.c09.dating.entity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "message")
@Getter
@Setter
@NoArgsConstructor
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false,columnDefinition = "INT")
    private Long id;

    private String content;

    private String date;

    private Boolean status;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "chatroom_detail_id", referencedColumnName = "id")
    private ChatRoomDetail chatRoomDetail;

    @OneToMany(mappedBy = "message", cascade = CascadeType.ALL)
    @JsonBackReference(value = "message_id")
    private Set<Img> imgSet;
}
