package com.hoald.orderfoodapplication.web;

import com.hoald.orderfoodapplication.model.dto.OrderDetailDTO;
import com.hoald.orderfoodapplication.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/orderDetail")
public class OrderDetailController extends AbstractApplicationController {

    @Autowired
    OrderDetailService orderDetailService;

    @GetMapping("/customersupplier/getOrderDetailByOrderId")
    public ResponseEntity<List<OrderDetailDTO>> getOrderDetailByOrderId(@RequestParam Long orderId) {
        List<OrderDetailDTO> orderDetailDTOS = orderDetailService.getOrderDetailByOrderId(orderId)
                .stream()
                .map(mapper::orderDetailToDTO)
                .collect(Collectors.toList());
        return new ResponseEntity<>(orderDetailDTOS, HttpStatus.OK);
    }
}
