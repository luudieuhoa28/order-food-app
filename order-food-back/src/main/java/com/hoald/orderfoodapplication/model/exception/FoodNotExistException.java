package com.hoald.orderfoodapplication.model.exception;

public class FoodNotExistException extends RuntimeException {
    public FoodNotExistException(String message) {
        super(message);
    }

}
