package com.c09.dating.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "relationship")
@Getter
@Setter
@NoArgsConstructor
public class Relationship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false,columnDefinition = "INT")
    private Long id;

    @ManyToOne

    @JoinColumn(name = "friend_id", referencedColumnName = "id")
    private User friendId;


    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "status_id", referencedColumnName = "id")
    private StatusRelationship statusRelationship;

    public User getUser() {
        return user;
    }
}
