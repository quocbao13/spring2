package com.c09.dating.security.jwt;

import com.c09.dating.entity.Role;
import com.c09.dating.entity.User;

import java.util.List;
import java.util.Set;

public class JwtResponse {
    private Long id;
    private String token;
    private User user;
    private List<String> roles;
    private String avatar;
    public JwtResponse(Long id,String accessToken, User user, List<String> roles) {
        this.id = id;
        this.token = accessToken;
        this.user = user;
        this.roles = roles;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }
}
