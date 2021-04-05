package com.hoald.orderfoodapplication.model.requestresponse;

import java.util.Arrays;
import java.util.List;

public class ErrorResponse {

    private String message;
    private  String typeException;

    public ErrorResponse(String message, String typeException) {
        this.message = message;
        this.typeException = typeException;
    }

    public ErrorResponse() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getTypeException() {
        return typeException;
    }

    public void setTypeException(String typeException) {
        this.typeException = typeException;
    }

}
