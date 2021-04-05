package com.hoald.orderfoodapplication.service;

import com.hoald.orderfoodapplication.model.entity.Food;

import java.util.List;

public interface FoodService {
    List<Food> getFoodsBySupplierId(Long supplierId);
    Food createFood(Food food);
    Food updateFood(Food food);
}
