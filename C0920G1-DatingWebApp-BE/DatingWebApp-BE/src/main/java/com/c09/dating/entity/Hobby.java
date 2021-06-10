package com.c09.dating.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "hobby")
@Getter
@Setter
@NoArgsConstructor
public class Hobby {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false,columnDefinition = "INT")
    private Long id;

    @Column(name = "name")
    private String name;


    @Column(name = "color")
    private String color;

    @OneToMany(mappedBy = "hobby", cascade = CascadeType.ALL)
    @JsonBackReference(value = "user_hobby")
    private Set<UserHobby> userHobbySet ;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Set<UserHobby> getUserHobbySet() {
        return userHobbySet;
    }

    public void setUserHobbySet(Set<UserHobby> userHobbySet) {
        this.userHobbySet = userHobbySet;
    }
}
