package com.c09.dating.DTO;

public class FriendCheck {
    Long id;
    Long friend_id;
    Long status_id;
    Long user_id;

    public FriendCheck() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getFriend_id() {
        return friend_id;
    }

    public void setFriend_id(Long friend_id) {
        this.friend_id = friend_id;
    }

    public Long getStatus_id() {
        return status_id;
    }

    public void setStatus_id(Long status_id) {
        this.status_id = status_id;
    }

    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }
}
