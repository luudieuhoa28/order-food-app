package com.hoald.orderfoodapplication.service.serviceimpl;

import com.hoald.orderfoodapplication.model.entity.Users;
import com.hoald.orderfoodapplication.model.exception.ExistUsernameException;
import com.hoald.orderfoodapplication.model.exception.UserNotExistException;
import com.hoald.orderfoodapplication.repository.UserRepository;
import com.hoald.orderfoodapplication.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    UserRepository userRepository;

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Override
    public Users findUserById(String id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public Users createUser(Users user) {
        user.setPassword(encoder.encode(user.getPassword()));
        Users users = findUserById(user.getId());
        if (users == null) {
            user.setStatus("AVAILABLE");
            return userRepository.save(user);
        }
        throw new ExistUsernameException("This username existed!!!");
    }

    @Override
    public Users updateUser(Users updateUser) {
        Users user = findUserById(updateUser.getId());
        if (user != null) {
            user.setName(updateUser.getName());
            user.setAddress(updateUser.getAddress());
            user.setPhone(updateUser.getPhone());
            return userRepository.save(user);
        }
        throw new UserNotExistException("This username does not exist!!!");
    }
}
