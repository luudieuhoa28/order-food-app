package com.hoald.orderfoodapplication.web;

import com.hoald.orderfoodapplication.model.dto.UserDTO;
import com.hoald.orderfoodapplication.model.entity.Users;
import com.hoald.orderfoodapplication.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/users")
public class UserController  extends AbstractApplicationController {

    @Autowired
    UserService userService;

    @GetMapping("/get")
    public ResponseEntity<UserDTO> searchByTerm(@RequestParam String userId) {
        UserDTO userDTO = mapper.userToDTO(userService.findUserById(userId));
       return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<UserDTO> createUser(@RequestBody UserDTO dto) {
        Users user = mapper.userDTOToUser(dto);
        return new ResponseEntity<>(mapper.userToDTO(userService.createUser(user)), HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<UserDTO> updateUser(@RequestBody UserDTO dto) {
        Users user = mapper.userDTOToUser(dto);
        return new ResponseEntity<>(mapper.userToDTO(userService.updateUser(user)), HttpStatus.OK);
    }
}
