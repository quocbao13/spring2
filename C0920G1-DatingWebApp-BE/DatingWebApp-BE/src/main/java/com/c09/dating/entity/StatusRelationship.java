package com.c09.dating.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "status_relationship")
@Getter
@Setter
@NoArgsConstructor
public class StatusRelationship {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false,columnDefinition = "INT")
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(mappedBy = "statusRelationship", cascade = CascadeType.ALL)
    @JsonBackReference(value = "status_relationship")
    private Set<Relationship> relationshipSet;

}
