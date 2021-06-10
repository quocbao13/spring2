package com.c09.dating.DTO;

public class MessageResponse {
    private String message;
    private String nameError;


    public MessageResponse(String nameError, String message) {
        this.nameError = nameError;
        this.message = message;
    }

    public String getNameError() {
        return nameError;
    }

    public void setNameError(String nameError) {
        this.nameError = nameError;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
