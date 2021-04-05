package com.hoald.orderfoodapplication.service.serviceimpl;

import com.hoald.orderfoodapplication.model.entity.OrderDetail;
import com.hoald.orderfoodapplication.model.entity.Orders;
import com.hoald.orderfoodapplication.model.exception.OrderNotExistException;
import com.hoald.orderfoodapplication.repository.OrderRepository;
import com.hoald.orderfoodapplication.service.OrderDetailService;
import com.hoald.orderfoodapplication.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;


@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderDetailService orderDetailService;

    @Override
    public Orders createNewOrder(Orders orders, List<OrderDetail> orderDetails) {
        orders = orderRepository.save(orders);
        final Long orderId = orders.getId();
        orderDetails.stream().forEach(orderDetail -> orderDetail.setOrder(new Orders(orderId)));
        orderDetailService.saveOrderDetails(orderDetails);
        return orders;
    }

    @Override
    public List<Orders> getOrdersBySupplierIdAndStatus(Long supplierId, String status) {
        return orderRepository.findBySupplierIdAndStatus(supplierId, status);
    }

    @Override
    public List<Orders> getOrdersByCustomerIdAndStatus(String customerId, String status) {
        return orderRepository.findByCustomerIdAndStatus(customerId, status);
    }

    @Override
    public Orders updateStatus(Long orderId, String newStatus) {
        Orders order;
        if (this.orderRepository.findById(orderId).isPresent()) {
            order = this.orderRepository.findById(orderId).get();
        } else {
            throw new OrderNotExistException("This order is not exist!!!");
        }
        order.setStatus(newStatus);
        this.orderRepository.save(order);
        return order;
    }
}
