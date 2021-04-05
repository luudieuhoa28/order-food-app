package com.hoald.orderfoodapplication.repository;

import com.hoald.orderfoodapplication.model.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface OrderRepository  extends JpaRepository<Orders, Long> {
    List<Orders> findBySupplierIdAndStatus(Long supplierId, String status);
    List<Orders> findByCustomerIdAndStatus(String customerId, String status);

}
