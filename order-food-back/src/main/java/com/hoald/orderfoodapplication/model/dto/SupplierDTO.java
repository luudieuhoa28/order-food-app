package com.hoald.orderfoodapplication.model.dto;
import com.hoald.orderfoodapplication.model.entity.Food;
import com.hoald.orderfoodapplication.model.entity.Orders;
import java.util.ArrayList;
import java.util.List;

public class SupplierDTO {

    private Long id;

    private String name;

    private String phone;

    private String address;

    private String openTime;

    private String closeTime;

    private String imgPath;

    private String status;

    private double rate;

    private UserDTO user;

    List<Long> feedbackIds = new ArrayList<>();

    List<Food> foods = new ArrayList<>();

    List<Orders> orders = new ArrayList<>();

    public SupplierDTO() {
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public double getRate() {
        return rate;
    }

    public void setRate(double rate) {
        this.rate = rate;
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

    public String getOpenTime() {
        return openTime;
    }

    public void setOpenTime(String openTime) {
        this.openTime = openTime;
    }

    public String getCloseTime() {
        return closeTime;
    }

    public void setCloseTime(String closeTime) {
        this.closeTime = closeTime;
    }

    public String getImgPath() {
        return imgPath;
    }

    public void setImgPath(String imgPath) {
        this.imgPath = imgPath;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<Long> getFeedbackIds() {
        return feedbackIds;
    }

    public void setFeedbackIds(List<Long> feedbackIds) {
        this.feedbackIds = feedbackIds;
    }

    public List<Food> getFoods() {
        return foods;
    }

    public void setFoods(List<Food> foods) {
        this.foods = foods;
    }

    public List<Orders> getOrders() {
        return orders;
    }

    public void setOrders(List<Orders> orders) {
        this.orders = orders;
    }
}
