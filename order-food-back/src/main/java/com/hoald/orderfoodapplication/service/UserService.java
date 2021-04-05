package com.hoald.orderfoodapplication.service;

import com.hoald.orderfoodapplication.model.entity.Users;

public interface UserService {
    Users findUserById(String id);
    Users createUser(Users user);
    Users updateUser(Users user);
}
