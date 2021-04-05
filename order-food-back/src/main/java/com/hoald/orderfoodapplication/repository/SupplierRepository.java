package com.hoald.orderfoodapplication.repository;

import com.hoald.orderfoodapplication.model.entity.Supplier;
import com.hoald.orderfoodapplication.repository.custom.SupplierCustomRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long>, QuerydslPredicateExecutor<Supplier>, SupplierCustomRepository {
    List<Supplier> findByUserId(String userId);
    Supplier findByName(String name);
}
