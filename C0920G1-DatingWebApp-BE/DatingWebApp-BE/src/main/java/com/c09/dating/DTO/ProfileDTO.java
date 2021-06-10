package com.c09.dating.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class ProfileDTO {
    Long idUserPost;
    String userPostAvatar;
    String userPostBackground;
    String fullnameUser;
    Long accountIdUser;
    Long postID;
    String postContent;
    String postDate;
    String postStatus;
    String count;
    Long commentID;
    String commentContent;
    String commentDate;
    String commentImg;
    Long commentIDpost;
    Long idUserComment;
    Long commentIDparent;
    Long userAvatarComment;
    String fullnameUserComment;




    public Long getIdUserPost() {
        return idUserPost;
    }

    public void setIdUserPost(Long idUserPost) {
        this.idUserPost = idUserPost;
    }

    public String getUserPostAvatar() {
        return userPostAvatar;
    }

    public void setUserPostAvatar(String userPostAvatar) {
        this.userPostAvatar = userPostAvatar;
    }

    public String getUserPostBackground() {
        return userPostBackground;
    }

    public void setUserPostBackground(String userPostBackground) {
        this.userPostBackground = userPostBackground;
    }

    public String getFullnameUser() {
        return fullnameUser;
    }

    public void setFullnameUser(String fullnameUser) {
        this.fullnameUser = fullnameUser;
    }

    public Long getAccountIdUser() {
        return accountIdUser;
    }

    public void setAccountIdUser(Long accountIdUser) {
        this.accountIdUser = accountIdUser;
    }

    public Long getPostID() {
        return postID;
    }

    public void setPostID(Long postID) {
        this.postID = postID;
    }

    public String getPostContent() {
        return postContent;
    }

    public void setPostContent(String postContent) {
        this.postContent = postContent;
    }

    public String getPostDate() {
        return postDate;
    }

    public void setPostDate(String postDate) {
        this.postDate = postDate;
    }

    public String getPostStatus() {
        return postStatus;
    }

    public void setPostStatus(String postStatus) {
        this.postStatus = postStatus;
    }

    public String getCount() {
        return count;
    }

    public void setCount(String count) {
        this.count = count;
    }

    public Long getCommentID() {
        return commentID;
    }

    public void setCommentID(Long commentID) {
        this.commentID = commentID;
    }

    public String getCommentContent() {
        return commentContent;
    }

    public void setCommentContent(String commentContent) {
        this.commentContent = commentContent;
    }

    public String getCommentDate() {
        return commentDate;
    }

    public void setCommentDate(String commentDate) {
        this.commentDate = commentDate;
    }

    public String getCommentImg() {
        return commentImg;
    }

    public void setCommentImg(String commentImg) {
        this.commentImg = commentImg;
    }

    public Long getCommentIDpost() {
        return commentIDpost;
    }

    public void setCommentIDpost(Long commentIDpost) {
        this.commentIDpost = commentIDpost;
    }

    public Long getIdUserComment() {
        return idUserComment;
    }

    public void setIdUserComment(Long idUserComment) {
        this.idUserComment = idUserComment;
    }

    public Long getCommentIDparent() {
        return commentIDparent;
    }

    public void setCommentIDparent(Long commentIDparent) {
        this.commentIDparent = commentIDparent;
    }

    public Long getUserAvatarComment() {
        return userAvatarComment;
    }

    public void setUserAvatarComment(Long userAvatarComment) {
        this.userAvatarComment = userAvatarComment;
    }

    public String getFullnameUserComment() {
        return fullnameUserComment;
    }

    public void setFullnameUserComment(String fullnameUserComment) {
        this.fullnameUserComment = fullnameUserComment;
    }
}
