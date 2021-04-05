package com.hoald.orderfoodapplication.model.entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Users {

    @Id
    private String id;

    @Column
    private String password;

    @Column
    private String name;

    @Column
    private String phone;

    @Column
    private String address;

    @Column(columnDefinition = "varchar(255) default 'AVAILABLE'")
    private String status;

    @ManyToOne
    @JoinColumn
    private Role role;

    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private List<Supplier> suppliers;

    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    List<Feedback> feedbacks = new ArrayList<>();

    @OneToMany(mappedBy = "customer")
    @JsonIgnore
    List<Orders> orders = new ArrayList<>();

    public Users() {
    }

    public List<Supplier> getSuppliers() {
        return suppliers;
    }

    public void setSuppliers(List<Supplier> suppliers) {
        this.suppliers = suppliers;
    }

    public Users(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public Users(String id) {
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

    public void setPassword(String username) {
        this.password = username;
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
