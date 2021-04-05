package com.hoald.orderfoodapplication.model.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hoald.orderfoodapplication.model.entity.Feedback;
import com.hoald.orderfoodapplication.model.entity.Orders;
import com.hoald.orderfoodapplication.model.entity.Role;
import com.hoald.orderfoodapplication.model.entity.Supplier;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

public class UserDTO {

    private String id;

    private String password;

    private String name;

    private String phone;

    private String address;

    private String status;

    private Role role;

    private List<Supplier> suppliers;

    List<Feedback> feedbacks = new ArrayList<>();

    List<Orders> orders = new ArrayList<>();

    public UserDTO(String id, String password, String name, String phone, String address, String status, Role role) {
        this.id = id;
        this.password = password;
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.status = status;
        this.role = role;
    }

    public UserDTO() {
    }

    public UserDTO(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public List<Supplier> getSuppliers() {
        return suppliers;
    }

    public void setSuppliers(List<Supplier> suppliers) {
        this.suppliers = suppliers;
    }

    public List<Feedback> getFeedbacks() {
        return feedbacks;
    }

    public void setFeedbacks(List<Feedback> feedbacks) {
        this.feedbacks = feedbacks;
    }

    public List<Orders> getOrders() {
        return orders;
    }

    public void setOrders(List<Orders> orders) {
        this.orders = orders;
    }
}
