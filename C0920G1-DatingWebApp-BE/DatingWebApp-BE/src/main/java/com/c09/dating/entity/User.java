package com.c09.dating.entity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "user")
@Getter
@Setter
@NoArgsConstructor
public class  User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false ,columnDefinition = "INT")
    private Long id;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "education")
    private String education;

    @Column(name = "gender")
    private String gender;

    @Column(name = "description_user")
    private String descriptionUser;

    @Column(name = "phone")
    private String phone;

    @Column(name = "avatar",columnDefinition = "LONGTEXT")
    private String avatar;

    @Column(name = "status_confirm")
    private Boolean statusConfirm;

    @Column(name = "background",columnDefinition = "LONGTEXT")
    private String background;

    @Column(name = "job")
    private String job;

    @Column(name = "married")
    private String married;

    @Column(name = "delete_flag")
    private Boolean deleteFlag;

    @Column(name = "date_of_birth")
    private LocalDate dayOfBirth;

    @Column(name = "dating_gender")
    private String datingGender;

    @Column(name = "status_on_off")
    private String statusOnOff;

    @Column(name = "status_user_setting")
    private String statsUserSetting;

    @ManyToOne
    @JoinColumn(name = "district_id", referencedColumnName = "id")
    private District district;


    @OneToOne
    @JsonBackReference(value = "user_account")
    @JoinColumn(name = "account_id", referencedColumnName = "id")
    private Account accounts;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonBackReference(value = "user_post_like")
    private Set<PostLike> postLikeSet;

    @JsonBackReference(value = "user_dislike_recommend")
    @OneToMany(mappedBy = "user")
    private Set<DisLikeRecommend> disLikeRecommendSet;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonBackReference(value = "user_relationship")
    private Set<Relationship> relationshipSet;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonBackReference(value = "user_chat_room")
    private Set<ChatRoom> chatRoomSet;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonBackReference(value = "user_chat_room_detail")
    private Set<ChatRoomDetail> chatRoomDetailSet;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonBackReference(value = "user_message")
    private Set<Message> messageSet ;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonBackReference(value = "user_comment")
    private Set<Comment> commentSet;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonBackReference(value = "user_group_detail")
    private Set<GroupDetail> groupDetailSet;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonBackReference(value = "user_hobby")
    private Set<UserHobby> userHobbySet;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonBackReference(value = "user_report")
    private Set<Report> reportSet;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonBackReference(value = "user_notifical")
    private Set<Notification> notificationSet;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonBackReference(value = "post_user")
    private Set<Post> postSet;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonBackReference(value = "user_admin_group")
    private Set<Group> groupSet;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEducation() {
        return education;
    }

    public void setEducation(String education) {
        this.education = education;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getDescriptionUser() {
        return descriptionUser;
    }

    public void setDescriptionUser(String descriptionUser) {
        this.descriptionUser = descriptionUser;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Boolean getStatusConfirm() {
        return statusConfirm;
    }

    public void setStatusConfirm(Boolean statusConfirm) {
        this.statusConfirm = statusConfirm;
    }

    public String getBackground() {
        return background;
    }

    public void setBackground(String background) {
        this.background = background;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public String getMarried() {
        return married;
    }

    public void setMarried(String married) {
        this.married = married;
    }

    public Boolean getDeleteFlag() {
        return deleteFlag;
    }

    public void setDeleteFlag(Boolean deleteFlag) {
        this.deleteFlag = deleteFlag;
    }

    public LocalDate getDayOfBirth() {
        return dayOfBirth;
    }

    public void setDayOfBirth(LocalDate dayOfBirth) {
        this.dayOfBirth = dayOfBirth;
    }

    public String getDatingGender() {
        return datingGender;
    }

    public void setDatingGender(String datingGender) {
        this.datingGender = datingGender;
    }

    public District getDistrict() {
        return district;
    }

    public void setDistrict(District district) {
        this.district = district;
    }

    public Account getAccounts() {
        return accounts;
    }

    public void setAccounts(Account accounts) {
        this.accounts = accounts;
    }

    public Set<PostLike> getPostLikeSet() {
        return postLikeSet;
    }

    public void setPostLikeSet(Set<PostLike> postLikeSet) {
        this.postLikeSet = postLikeSet;
    }

    public Set<DisLikeRecommend> getDisLikeRecommendSet() {
        return disLikeRecommendSet;
    }

    public void setDisLikeRecommendSet(Set<DisLikeRecommend> disLikeRecommendSet) {
        this.disLikeRecommendSet = disLikeRecommendSet;
    }

    public Set<Relationship> getRelationshipSet() {
        return relationshipSet;
    }

    public void setRelationshipSet(Set<Relationship> relationshipSet) {
        this.relationshipSet = relationshipSet;
    }

    public Set<ChatRoom> getChatRoomSet() {
        return chatRoomSet;
    }

    public void setChatRoomSet(Set<ChatRoom> chatRoomSet) {
        this.chatRoomSet = chatRoomSet;
    }

    public Set<ChatRoomDetail> getChatRoomDetailSet() {
        return chatRoomDetailSet;
    }

    public void setChatRoomDetailSet(Set<ChatRoomDetail> chatRoomDetailSet) {
        this.chatRoomDetailSet = chatRoomDetailSet;
    }

    public Set<Message> getMessageSet() {
        return messageSet;
    }

    public void setMessageSet(Set<Message> messageSet) {
        this.messageSet = messageSet;
    }

    public Set<Comment> getCommentSet() {
        return commentSet;
    }

    public void setCommentSet(Set<Comment> commentSet) {
        this.commentSet = commentSet;
    }

    public Set<GroupDetail> getGroupDetailSet() {
        return groupDetailSet;
    }

    public void setGroupDetailSet(Set<GroupDetail> groupDetailSet) {
        this.groupDetailSet = groupDetailSet;
    }

    public Set<UserHobby> getUserHobbySet() {
        return userHobbySet;
    }

    public void setUserHobbySet(Set<UserHobby> userHobbySet) {
        this.userHobbySet = userHobbySet;
    }

    public Set<Report> getReportSet() {
        return reportSet;
    }

    public void setReportSet(Set<Report> reportSet) {
        this.reportSet = reportSet;
    }

    public Set<Notification> getNotificationSet() {
        return notificationSet;
    }

    public void setNotificationSet(Set<Notification> notificationSet) {
        this.notificationSet = notificationSet;
    }

    public Set<Post> getPostSet() {
        return postSet;
    }

    public void setPostSet(Set<Post> postSet) {
        this.postSet = postSet;
    }

    public String getStatusOnOff() {
        return statusOnOff;
    }

    public void setStatusOnOff(String statusOnOff) {
        this.statusOnOff = statusOnOff;
    }

    public String getStatsUserSetting() {
        return statsUserSetting;
    }

    public void setStatsUserSetting(String statsUserSetting) {
        this.statsUserSetting = statsUserSetting;
    }

    public Set<Group> getGroupSet() {
        return groupSet;
    }

    public void setGroupSet(Set<Group> groupSet) {
        this.groupSet = groupSet;
    }
}
