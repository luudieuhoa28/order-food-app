package com.hoald.orderfoodapplication.model.exception;

public class ExistUsernameException extends RuntimeException {
    public ExistUsernameException(String message) {
        super(message);
    }
}
