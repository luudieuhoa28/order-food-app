package com.hoald.orderfoodapplication.service.serviceimpl;

import com.hoald.orderfoodapplication.model.entity.OrderDetail;
import com.hoald.orderfoodapplication.repository.OrderDetailRepository;
import com.hoald.orderfoodapplication.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
public class OrderDetailServiceImpl implements OrderDetailService {

    @Autowired
    private OrderDetailRepository orderDetailRepository;

    @Override
    public List<OrderDetail> saveOrderDetails(List<OrderDetail> orderDetails) {
        return this.orderDetailRepository.saveAll(orderDetails);
    }

    @Override
    public List<OrderDetail> getOrderDetailByOrderId(Long orderId) {
        return orderDetailRepository.findByOrOrderId(orderId);
    }
}
