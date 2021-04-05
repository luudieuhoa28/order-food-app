package com.hoald.orderfoodapplication.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class OrderDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private int numOfDishes;

    @ManyToOne
    @JoinColumn
    private Food food;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    @JsonIgnore
    private Orders order;

    public OrderDetail() {
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
}
