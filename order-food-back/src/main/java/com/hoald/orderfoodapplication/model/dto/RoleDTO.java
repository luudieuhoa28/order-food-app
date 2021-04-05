package com.hoald.orderfoodapplication.model.dto;
import com.hoald.orderfoodapplication.model.entity.Users;
import java.util.List;

public class RoleDTO {

    private Long id;


    private String name;

    private List<Users> user;

    public RoleDTO(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    public RoleDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Users> getUser() {
        return user;
    }

    public void setUser(List<Users> user) {
        this.user = user;
    }
}
