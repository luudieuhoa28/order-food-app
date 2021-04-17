package com.hoald.orderfoodapplication.model.exception;

public class EditByOtherException extends RuntimeException {
    public EditByOtherException(String message) {
        super(message);
    }

}
