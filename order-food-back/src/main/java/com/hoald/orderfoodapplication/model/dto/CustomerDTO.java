package com.hoald.orderfoodapplication.model.dto;

import com.hoald.orderfoodapplication.model.entity.Feedback;
import com.hoald.orderfoodapplication.model.entity.Orders;
import java.util.ArrayList;
import java.util.List;

public class CustomerDTO {

    private Long id;

    private String name;

    private String phone;

    private String address;

    private String status;

    List<Feedback> feedbacks = new ArrayList<>();

    List<Orders> orders = new ArrayList<>();

    public CustomerDTO() {
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
