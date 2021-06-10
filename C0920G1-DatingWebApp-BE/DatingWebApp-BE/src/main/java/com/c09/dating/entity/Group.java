package com.c09.dating.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "group_user")
public class Group {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false,columnDefinition = "INT")
    private Long id;

    @Column(name = "name")
    @NotNull(message = "Vui lòng nhập câu trả lời")
    private String name;

    @Column(name= "about_group")
    private String aboutGroup;

    @Column(name= "background_group" ,columnDefinition = "LONGTEXT")
    private String backgroundGroup;

    @Column(name= "start_date",columnDefinition = "DATE")
    private LocalDate startDate;

    @Column(name= "delete_flag")
    private Boolean deleteFlag;


    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL)
    @JsonBackReference(value = "group_detail")
    private Set<GroupDetail> groupDetailSet ;

    @OneToMany(mappedBy = "group", cascade = CascadeType.ALL)
    @JsonBackReference(value = "group_post")
    private Set<Post> postSet;

    public Group() {
    }

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

    public String getAboutGroup() {
        return aboutGroup;
    }

    public void setAboutGroup(String aboutGroup) {
        this.aboutGroup = aboutGroup;
    }

    public String getBackgroundGroup() {
        return backgroundGroup;
    }

    public void setBackgroundGroup(String backgroundGroup) {
        this.backgroundGroup = backgroundGroup;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public Boolean getDeleteFlag() {
        return deleteFlag;
    }

    public void setDeleteFlag(Boolean deleteFlag) {
        this.deleteFlag = deleteFlag;
    }

    public Set<GroupDetail> getGroupDetailSet() {
        return groupDetailSet;
    }

    public void setGroupDetailSet(Set<GroupDetail> groupDetailSet) {
        this.groupDetailSet = groupDetailSet;
    }

    public Set<Post> getPostSet() {
        return postSet;
    }


    public void setPostSet(Set<Post> postSet) {
        this.postSet = postSet;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
