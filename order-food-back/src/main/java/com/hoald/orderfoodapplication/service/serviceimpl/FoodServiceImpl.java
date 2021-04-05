package com.hoald.orderfoodapplication.service.serviceimpl;

import com.hoald.orderfoodapplication.model.entity.Food;
import com.hoald.orderfoodapplication.model.exception.FoodNotExistException;
import com.hoald.orderfoodapplication.repository.FoodRepository;
import com.hoald.orderfoodapplication.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class FoodServiceImpl implements FoodService {

    @Autowired
    FoodRepository foodRepository;

    @Override
    public List<Food> getFoodsBySupplierId(Long supplierId) {
        return foodRepository.findBySupplierId(supplierId);
    }

    @Override
    public Food createFood(Food food) {
        return this.foodRepository.save(food);
    }

    @Override
    public Food updateFood(Food food) {
        Optional<Food> optionalFood = this.foodRepository.findById(food.getId());
        if (optionalFood.isPresent()) {
            Food existedFood = optionalFood.get();
            existedFood.setName(food.getName());
            existedFood.setPrice(food.getPrice());
            return existedFood;
        }
        throw new FoodNotExistException("This food does not exist!!!");
    }
}
