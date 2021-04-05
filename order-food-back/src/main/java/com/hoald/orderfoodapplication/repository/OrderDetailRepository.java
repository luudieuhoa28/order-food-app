package com.hoald.orderfoodapplication.repository;

import com.hoald.orderfoodapplication.model.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderDetailRepository  extends JpaRepository<OrderDetail, Long> {
    List<OrderDetail> findByOrOrderId(Long orderId);
 }
