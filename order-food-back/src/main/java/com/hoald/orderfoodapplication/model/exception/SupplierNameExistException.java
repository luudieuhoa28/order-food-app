package com.hoald.orderfoodapplication.model.exception;

public class SupplierNameExistException extends RuntimeException {
    public SupplierNameExistException(String message) {
        super(message);
    }
}
