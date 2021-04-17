package com.hoald.orderfoodapplication.service;

import com.hoald.orderfoodapplication.model.entity.Food;

import java.util.List;

public interface FoodService {
    List<Food> getFoodsBySupplierIdAndStatus(Long supplierId, String status);
    Food createFood(Food food);
    Food updateFood(Food food);
}
