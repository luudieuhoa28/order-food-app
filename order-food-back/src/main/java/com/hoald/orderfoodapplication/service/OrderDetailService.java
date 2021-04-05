package com.hoald.orderfoodapplication.service;

import com.hoald.orderfoodapplication.model.entity.OrderDetail;

import java.util.List;

public interface OrderDetailService {
    List<OrderDetail> saveOrderDetails(List<OrderDetail> orderDetails);
    List<OrderDetail> getOrderDetailByOrderId(Long orderId);

}
