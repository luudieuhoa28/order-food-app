package com.hoald.orderfoodapplication.service.serviceimpl;

import com.hoald.orderfoodapplication.model.entity.Role;
import com.hoald.orderfoodapplication.model.entity.Users;
import com.hoald.orderfoodapplication.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class MyUserDetailService implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        Users user = userService.findUserById(id);
        List<GrantedAuthority> authorities = getUserAuthority(user.getRole());
        return buildUserForAuthentication(user, authorities);
    }

    private List<GrantedAuthority> getUserAuthority(Role userRole) {
        Set<GrantedAuthority> roles = new HashSet<>();
        roles.add(new SimpleGrantedAuthority(userRole.getName()));
        return new ArrayList<>(roles);
    }

    private UserDetails buildUserForAuthentication(Users user, List<GrantedAuthority> authorities) {
        return new org.springframework.security.core.userdetails.User(user.getId(), user.getPassword(),
                "AVAILABLE".equalsIgnoreCase(user.getStatus()), true, true, true, authorities);
    }

}
