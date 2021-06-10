package com.c09.dating.DTO;

public class UserDTO {
    private int id;
    private String name;
    private int gender;
    private String job;
    private String address;
    private int dateOfBirth;
    private String hobby;

    public UserDTO() {
    }

    public UserDTO(int id, String name, int gender, String job, String address, int dateOfBirth, String hobby) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.job = job;
        this.address = address;
        this.dateOfBirth = dateOfBirth;
        this.hobby = hobby;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getGender() {
        return gender;
    }

    public void setGender(int gender) {
        this.gender = gender;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(int dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getHobby() {
        return hobby;
    }

    public void setHobby(String hobby) {
        this.hobby = hobby;
    }
}
