package com.hoald.orderfoodapplication.repository;

import com.hoald.orderfoodapplication.model.entity.Food;
import com.hoald.orderfoodapplication.repository.custom.FoodCustomRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodRepository  extends JpaRepository<Food, Long>, FoodCustomRepository {
}
