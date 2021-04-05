package com.hoald.orderfoodapplication.model.dto;
import com.hoald.orderfoodapplication.model.entity.OrderDetail;
import com.hoald.orderfoodapplication.model.entity.Supplier;
import java.util.ArrayList;
import java.util.List;

public class FoodDTO {

    private Long id;

    private int price;

    private String name;

    private String imgPath;

    private String status;

    private Supplier supplier;

    List<OrderDetail> orderDetails = new ArrayList<>();

    private int version;

    public FoodDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public List<OrderDetail> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(List<OrderDetail> orderDetails) {
        this.orderDetails = orderDetails;
    }

    public int getVersion() {
        return version;
    }

    public void setVersion(int version) {
        this.version = version;
    }
}
