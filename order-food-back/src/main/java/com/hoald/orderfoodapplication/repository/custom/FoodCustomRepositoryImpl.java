package com.hoald.orderfoodapplication.repository.custom;

import com.hoald.orderfoodapplication.model.entity.Food;
import com.hoald.orderfoodapplication.model.entity.QFood;
import com.querydsl.jpa.impl.JPAQuery;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public class FoodCustomRepositoryImpl implements FoodCustomRepository {
    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Food> findFoodBySupplierIdAndStatuses(Long supplierId, String status) {
        JPAQuery<Food> query = new JPAQuery<Food>(em)
                .from(QFood.food)
                .where(QFood.food.supplier.id.eq(supplierId)
                        .and(QFood.food.status.eq("AVAILABLE").or(QFood.food.status.eq(status))));
        return query.fetch();
    }
}
