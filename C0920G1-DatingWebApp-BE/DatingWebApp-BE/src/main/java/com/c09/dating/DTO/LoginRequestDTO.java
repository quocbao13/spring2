package com.c09.dating.DTO;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class LoginRequestDTO {

    @NotBlank(message = "Vui lòng nhập email!")
    @Pattern(regexp = "^[a-z0-9_.]+[a-z0-9]@([a-z0-9]+\\.)[a-z]+(|\\.[a-z]+)$", message = "Email phải đúng định dạng abc@xyz.xyz")
    private String email;

    @NotBlank(message = "Vui lòng nhập mật khẩu!")
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
