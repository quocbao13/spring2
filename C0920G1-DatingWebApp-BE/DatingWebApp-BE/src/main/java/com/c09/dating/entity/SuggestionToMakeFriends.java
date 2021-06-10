package com.c09.dating.entity;

public class SuggestionToMakeFriends {
    private Long userId;

    public SuggestionToMakeFriends(Long userId) {
        this.userId = userId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
