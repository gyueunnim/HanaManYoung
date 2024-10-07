package com.hana.manYoung.model;

import lombok.Getter;
import lombok.Setter;

@Setter
public class ApiResponse<T> {
    private boolean isSuccess;
    private int code;
    private String message;
    @Getter
    private T data;

    public ApiResponse(boolean isSuccess, int code, String message, T data) {
        this.isSuccess = isSuccess;
        this.code = code;
        this.message = message;
        this.data = data;
    }

    // Getters and Setters
    public boolean getIsSuccess() {
        return isSuccess;
    }

}
