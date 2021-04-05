package com.hoald.orderfoodapplication.service;

import com.hoald.orderfoodapplication.model.entity.Role;

public interface RoleService {
    Role findRoleByName(String name);
    Role create(Long id, String name);
}
