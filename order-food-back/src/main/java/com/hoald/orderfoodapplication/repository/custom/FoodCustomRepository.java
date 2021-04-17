package com.hoald.orderfoodapplication.repository.custom;

import com.hoald.orderfoodapplication.model.entity.Food;

import java.util.List;

public interface FoodCustomRepository {
    List<Food> findFoodBySupplierIdAndStatuses(Long supplierId, String statuse);
}
