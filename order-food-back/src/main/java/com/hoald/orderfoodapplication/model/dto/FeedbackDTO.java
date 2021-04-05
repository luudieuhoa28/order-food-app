package com.hoald.orderfoodapplication.model.dto;
import com.hoald.orderfoodapplication.model.entity.Supplier;
import com.hoald.orderfoodapplication.model.entity.Users;


public class FeedbackDTO {

    private Long id;

    private String comment;

    private double starRate;

    private Users customer;

    private Supplier supplier;

    public FeedbackDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public double getStarRate() {
        return starRate;
    }

    public void setStarRate(double starRate) {
        this.starRate = starRate;
    }

    public Users getCustomer() {
        return customer;
    }

    public void setCustomer(Users customer) {
        this.customer = customer;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }
}
