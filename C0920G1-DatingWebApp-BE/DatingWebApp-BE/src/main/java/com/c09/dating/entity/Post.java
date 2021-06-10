package com.c09.dating.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;




@Entity
@Table(name = "post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false,columnDefinition = "INT")
    private Long id;

    @Column(name = "content")
    private String content;

    @Column(name = "create_date")
    private String createDate;

    @Column(name = "status")
    private String status;

    @Column(name = "delete_flag")
    private boolean deleteFlag;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "group_id", referencedColumnName = "id")
    private Group group;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private Set<Img> imgSet;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private Set<PostLike> postLikeSet;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private Set<Comment> commentSet;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    @JsonBackReference(value = "post_report")
    private Set<Report> reportSet;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean isDeleteFlag() {
        return deleteFlag;
    }

    public void setDeleteFlag(boolean deleteFlag) {
        this.deleteFlag = deleteFlag;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Group getGroup() {
        return group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public Set<Img> getImgSet() {
        return imgSet;
    }

    public void setImgSet(Set<Img> imgSet) {
        this.imgSet = imgSet;
    }

    public Set<PostLike> getPostLikeSet() {
        return postLikeSet;
    }

    public void setPostLikeSet(Set<PostLike> postLikeSet) {
        this.postLikeSet = postLikeSet;
    }

    public Set<Comment> getCommentSet() {
        return commentSet;
    }

    public void setCommentSet(Set<Comment> commentSet) {
        this.commentSet = commentSet;
    }

    public Set<Report> getReportSet() {
        return reportSet;
    }

    public void setReportSet(Set<Report> reportSet) {
        this.reportSet = reportSet;
    }
}
