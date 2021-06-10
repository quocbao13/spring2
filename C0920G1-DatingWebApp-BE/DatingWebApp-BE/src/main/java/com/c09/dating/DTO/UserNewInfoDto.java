package com.c09.dating.DTO;

import com.c09.dating.entity.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

@Data
public class UserNewInfoDto {

    private Long id;

    private String fullName;

    private String education;

    private String gender;

    private String descriptionUser;

    private String phone;

    private String avatar;

    private Boolean statusConfirm;

    private String background;

    private String job;

    private String married;

    private LocalDate dayOfBirth;

    private String datingGender;

    private District district;

//    private Account accounts;

    private Set<UserHobby> userHobbySet;

    public UserNewInfoDto() {
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
/*
    public Account getAccounts() {
        return accounts;
    }

    public void setAccounts(Account accounts) {
        this.accounts = accounts;
    }
*/
    public Set<UserHobby> getUserHobbySet() {
        return userHobbySet;
    }

    public void setUserHobbySet(Set<UserHobby> userHobbySet) {
        this.userHobbySet = userHobbySet;
    }
}
