package com.c09.dating.DTO;

import com.c09.dating.entity.Hobby;

import java.util.List;

public class ListUserRecommendToShowDTO {
    private Long userId;
    private String name;
    private int birthDay;
    private String gender;
    private String province;
    private String img;
    private String description;
    private List<Hobby> hobbies;

    public ListUserRecommendToShowDTO(){}

    public ListUserRecommendToShowDTO(Long userId, String name, int birthDay, String gender, String province, String description) {
        this.userId = userId;
        this.name = name;
        this.birthDay = birthDay;
        this.gender = gender;
        this.province = province;
        this.description = description;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getBirthDay() {
        return birthDay;
    }

    public void setBirthDay(int birthDay) {
        this.birthDay = birthDay;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Hobby> getHobbies() {
        return hobbies;
    }

    public void setHobbies(List<Hobby> hobbies) {
        this.hobbies = hobbies;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }
}
