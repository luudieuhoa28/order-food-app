package com.hoald.orderfoodapplication.model.exception;

public class OrderNotExistException extends RuntimeException  {
    public OrderNotExistException(String message) {
        super(message);
    }
}
