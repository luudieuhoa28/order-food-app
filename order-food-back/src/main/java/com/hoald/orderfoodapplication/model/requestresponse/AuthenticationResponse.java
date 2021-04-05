package com.hoald.orderfoodapplication.model.requestresponse;

import java.io.Serializable;

public class AuthenticationResponse implements Serializable {

    private final String jwt;
    private final String username;
    private final String role;

    public AuthenticationResponse(String jwt, String username, String role) {
        this.jwt = jwt;
        this.username = username;
        this.role = role;
    }

    public String getJwt() {
        return jwt;
    }

    public String getUsername() {
        return username;
    }

    public String getRole() {
        return role;
    }
}
