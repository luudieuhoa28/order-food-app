package com.hoald.orderfoodapplication.service;

import com.hoald.orderfoodapplication.model.entity.OrderDetail;
import com.hoald.orderfoodapplication.model.entity.Orders;

import java.util.List;

public interface OrderService {
    Orders createNewOrder(Orders orders,  List<OrderDetail> orderDetails);
    List<Orders> getOrdersBySupplierIdAndStatus(Long supplierId, String status);
    List<Orders> getOrdersByCustomerIdAndStatus(String customerId, String status);
    Orders updateStatus(Long orderId, String newSatus);
}
