package com.hoald.orderfoodapplication.repository;

import com.hoald.orderfoodapplication.model.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Users, String> {
    Optional<Users> findById(String id);

}
