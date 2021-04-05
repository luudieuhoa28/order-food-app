package com.hoald.orderfoodapplication.model.exception;

public class SupplierNotExistException extends RuntimeException  {
    public SupplierNotExistException(String message) {
        super(message);
    }
}
