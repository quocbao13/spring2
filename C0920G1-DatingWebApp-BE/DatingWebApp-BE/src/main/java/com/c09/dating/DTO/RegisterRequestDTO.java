package com.c09.dating.DTO;

import javax.validation.constraints.NotBlank;

public class RegisterRequestDTO {

    @NotBlank(message = "Vui lòng nhập email!")
    private String email;
    @NotBlank(message = "Vui lòng nhập mật khẩu!")
    private String password;

    private String checkPassword;

    private boolean checkPolicy;

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getCheckPassword() {
        return checkPassword;
    }

    public void setCheckPassword(String checkPassword) {
        this.checkPassword = checkPassword;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public boolean isCheckPolicy() {
        return checkPolicy;
    }

    public void setCheckPolicy(boolean checkPolicy) {
        this.checkPolicy = checkPolicy;
    }
}
