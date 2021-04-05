package com.hoald.orderfoodapplication.model.dto;
import com.hoald.orderfoodapplication.model.entity.Food;
import com.hoald.orderfoodapplication.model.entity.Orders;


public class OrderDetailDTO {

    private Long id;

    private int numOfDishes;

    private Food food;

    private Orders order;

    public OrderDetailDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getNumOfDishes() {
        return numOfDishes;
    }

    public void setNumOfDishes(int numOfDishes) {
        this.numOfDishes = numOfDishes;
    }

    public Food getFood() {
        return food;
    }

    public void setFood(Food food) {
        this.food = food;
    }

    public Orders getOrder() {
        return order;
    }

    public void setOrder(Orders order) {
        this.order = order;
    }
}
