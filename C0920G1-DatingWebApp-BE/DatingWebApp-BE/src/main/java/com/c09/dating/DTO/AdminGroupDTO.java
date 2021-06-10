package com.c09.dating.DTO;

public class AdminGroupDTO {
    private Long id;
    private String fullName;
    private String phone;
    private String avatar;

    public AdminGroupDTO(Long id, String fullName, String phone, String avatar) {
        this.id = id;
        this.fullName = fullName;
        this.phone = phone;
        this.avatar = avatar;
    }

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
}
