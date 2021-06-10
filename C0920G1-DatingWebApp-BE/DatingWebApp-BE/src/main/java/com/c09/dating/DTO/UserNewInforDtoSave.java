package com.c09.dating.DTO;

import com.c09.dating.common.regex.RegexUlti;
import com.c09.dating.entity.Account;
import com.c09.dating.entity.District;
import com.c09.dating.entity.UserHobby;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.Pattern;
import java.time.LocalDate;
import java.util.Set;

public class UserNewInforDtoSave {

    private Long id;

//    @Pattern(regexp = RegexUlti.REGEX_FULLNAME
//            , message = "Tên người không có ký tự đặc biệt và số, giới hạn 45 ký tự, vd: Alex Đỉnh")
    private String fullName;

//    @Pattern(regexp = RegexUlti.REGEX_FULLNAME
//            , message = "Tên trường đã học không có ký tự đặc biệt và số, giới hạn 45 ký tự vd: Tôn Đức Thắng university")
    private String education;

//    @Pattern(regexp = RegexUlti.REGEX_GENDER
//            , message = "Giới tính chỉ có 6 giá trị là Male, Female, Nam, Nữ, Khác, Other")
    private String gender;

//    @Pattern(regexp = RegexUlti.REGEX_DESCRIPTION
//            , message = "Không được có ký tự đặc biệt, giới hạn là 255 ký tự trở lại")
    private String descriptionUser;


//    @Pattern(regexp = RegexUlti.REGEX_PHONE
//            , message = "Sdt có 10 số, vd: 0902687148")
    private String phone;

    private String avatar;

    private Boolean statusConfirm;

    private String background;

//    @Pattern(regexp = RegexUlti.REGEX_FULLNAME
//            , message = "Tên công việc không có ký tự đặc biệt và số, giới hạn 45 ký tự, vd: Kế toán, accountant")
    private String job;

//    @Pattern(regexp = RegexUlti.REGEX_MARRIED
//            , message = "Chỉ nhận 6 giá trị là (Độc thân), (Đã kết hôn), (Khác), (Single), (Married), (Other)")
    private String married;

//    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private LocalDate dayOfBirth;

//    @Pattern(regexp = RegexUlti.REGEX_GENDER, message = "Giới tính chỉ có 4 giá trị là Male, Female, Other, Nam, Nữ, Khác")
    private String datingGender;

    private District district;



    private Set<UserHobby> userHobbySet;

    public UserNewInforDtoSave() {
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
