package com.c09.dating.DTO;

public class MutualFriendDTO1 {
    String getAvatar;

    String getUsername;

    String getFullName;

    String getDescribeUser;

    String getStatus;

    Long getUserID;

    Long getFriendID;

    Long getMutualFriends;

    public MutualFriendDTO1(String getAvatar, String getUsername, String getFullName, String getDescribeUser, String getStatus, Long getUserID, Long getFriendID, Long getMutualFriends) {
        this.getAvatar = getAvatar;
        this.getUsername = getUsername;
        this.getFullName = getFullName;
        this.getDescribeUser = getDescribeUser;
        this.getStatus = getStatus;
        this.getUserID = getUserID;
        this.getFriendID = getFriendID;
        this.getMutualFriends = getMutualFriends;
    }

    public String getGetAvatar() {
        return getAvatar;
    }

    public void setGetAvatar(String getAvatar) {
        this.getAvatar = getAvatar;
    }

    public String getGetUsername() {
        return getUsername;
    }

    public void setGetUsername(String getUsername) {
        this.getUsername = getUsername;
    }

    public String getGetFullName() {
        return getFullName;
    }

    public void setGetFullName(String getFullName) {
        this.getFullName = getFullName;
    }

    public String getGetDescribeUser() {
        return getDescribeUser;
    }

    public void setGetDescribeUser(String getDescribeUser) {
        this.getDescribeUser = getDescribeUser;
    }

    public String getGetStatus() {
        return getStatus;
    }

    public void setGetStatus(String getStatus) {
        this.getStatus = getStatus;
    }

    public Long getGetUserID() {
        return getUserID;
    }

    public void setGetUserID(Long getUserID) {
        this.getUserID = getUserID;
    }

    public Long getGetFriendID() {
        return getFriendID;
    }

    public void setGetFriendID(Long getFriendID) {
        this.getFriendID = getFriendID;
    }

    public Long getGetMutualFriends() {
        return getMutualFriends;
    }

    public void setGetMutualFriends(Long getMutualFriends) {
        this.getMutualFriends = getMutualFriends;
    }
}
