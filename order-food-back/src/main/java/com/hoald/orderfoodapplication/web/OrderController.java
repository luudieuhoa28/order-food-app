package com.hoald.orderfoodapplication.web;

import com.hoald.orderfoodapplication.model.dto.OrderDTO;
import com.hoald.orderfoodapplication.model.entity.OrderDetail;
import com.hoald.orderfoodapplication.model.entity.Orders;
import com.hoald.orderfoodapplication.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/orders")
public class OrderController extends AbstractApplicationController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/customer/create")
    public ResponseEntity<OrderDTO> createNewOrder(@RequestBody OrderDTO orderDTO) {
        Orders order = mapper.OrderDTOToOder(orderDTO);
        List<OrderDetail> orderDetails = orderDTO.getOrderDetails()
                .stream()
                .map(mapper::orderDetailDTOToOrderDetail)
                .collect(Collectors.toList());
        order = this.orderService.createNewOrder(order, orderDetails);
        return new ResponseEntity<>(mapper.OrderToDTO(order), HttpStatus.OK);
    }


    @GetMapping("/supplier/getBySupplierIdAndStatus")
    public ResponseEntity<List<OrderDTO>> getBySupplierId(@RequestParam Long supplierId, @RequestParam String status) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        List<OrderDTO> orderDTOS = this.orderService.getOrdersBySupplierIdAndStatus(supplierId, status)
                .stream()
                .map(mapper::OrderToDTO)
                .collect(Collectors.toList());
        return new ResponseEntity<>(orderDTOS, HttpStatus.OK);
    }

    @GetMapping("/customer/getByCustomerIdAndStatus")
    public ResponseEntity<List<OrderDTO>> getByCustomerId(@RequestParam String customerId, @RequestParam String status) {
        List<OrderDTO> orderDTOS = this.orderService.getOrdersByCustomerIdAndStatus(customerId, status)
                .stream()
                .map(mapper::OrderToDTO)
                .collect(Collectors.toList());
        return new ResponseEntity<>(orderDTOS, HttpStatus.OK);
    }
    @GetMapping("/customersupplier/updateStatus")
    public ResponseEntity<OrderDTO> updateStatus(@RequestParam String orderId, @RequestParam String newStatus) {

        OrderDTO order = mapper.OrderToDTO(this.orderService.updateStatus(Long.parseLong(orderId), newStatus));
        return new ResponseEntity<>(order, HttpStatus.OK);
    }

}
