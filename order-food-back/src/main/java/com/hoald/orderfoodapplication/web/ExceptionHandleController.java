package com.hoald.orderfoodapplication.web;

import com.hoald.orderfoodapplication.model.exception.ExistUsernameException;
import com.hoald.orderfoodapplication.model.exception.OrderNotExistException;
import com.hoald.orderfoodapplication.model.exception.SupplierNameExistException;
import com.hoald.orderfoodapplication.model.requestresponse.ErrorResponse;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ExceptionHandleController extends ResponseEntityExceptionHandler {

    @ExceptionHandler({SignatureException.class})
    public ResponseEntity<Object> handleInvalidTokenException(SignatureException ex, WebRequest request) {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setMessage(ex.getMessage());
        errorResponse.setTypeException("INVALID_JWT_TOKEN");
        return new ResponseEntity<>(errorResponse, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler({InternalAuthenticationServiceException.class, BadCredentialsException.class})
    public ResponseEntity<Object> handleConstraintViolation(Exception ex, WebRequest request) {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setMessage(ex.getMessage());
        errorResponse.setTypeException("WRONG_USERNAME_OR_PASSWORD");
        return new ResponseEntity<>(errorResponse, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler({ExistUsernameException.class})
    public ResponseEntity<Object> handleExistUsernameEception(Exception ex, WebRequest request) {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setMessage(ex.getMessage());
        errorResponse.setTypeException("EXISTED_USERNAME");
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({ExpiredJwtException.class})
    public ResponseEntity<Object> handleJWTExpiredException(Exception ex, WebRequest request) {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setMessage(ex.getMessage());
        errorResponse.setTypeException("EXPIRED_JWT");
        return new ResponseEntity<>(errorResponse, HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler({OrderNotExistException.class})
    public ResponseEntity<Object> handleOrderNotExist(Exception ex, WebRequest request) {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setMessage(ex.getMessage());
        errorResponse.setTypeException("EXPIRED_JWT");
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({SupplierNameExistException.class})
    public ResponseEntity<Object> handleSupplierNameExistException(Exception ex, WebRequest request) {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setMessage(ex.getMessage());
        errorResponse.setTypeException("EXPIRED_JWT");
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }


}
