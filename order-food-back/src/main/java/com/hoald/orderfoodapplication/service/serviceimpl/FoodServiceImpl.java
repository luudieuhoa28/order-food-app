package com.hoald.orderfoodapplication.service.serviceimpl;

import com.hoald.orderfoodapplication.model.entity.Food;
import com.hoald.orderfoodapplication.model.exception.EditByOtherException;
import com.hoald.orderfoodapplication.model.exception.FoodNotExistException;
import com.hoald.orderfoodapplication.repository.FoodRepository;
import com.hoald.orderfoodapplication.service.FoodService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Transactional
@Service
public class FoodServiceImpl implements FoodService {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    FoodRepository foodRepository;

    @Override
    public List<Food> getFoodsBySupplierIdAndStatus(Long supplierId, String status) {
        return foodRepository.findFoodBySupplierIdAndStatuses(supplierId, status);
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
            entityManager.detach(existedFood);
            if (food.getName() != null) {
                existedFood.setName(food.getName());
            }
            if (food.getPrice() != 0) {
                existedFood.setPrice(food.getPrice());
            }

            if (food.getStatus() != null) {
                existedFood.setStatus(food.getStatus());
            }
            existedFood.setVersion(food.getVersion());
            try{
                this.foodRepository.save(existedFood);

            } catch (ObjectOptimisticLockingFailureException e) {
                throw new EditByOtherException("This item is edited by someone!!!");
            }
            return existedFood;
        }
        throw new FoodNotExistException("This food does not exist!!!");
    }
}
