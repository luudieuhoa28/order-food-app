package com.hoald.orderfoodapplication.util;

import com.hoald.orderfoodapplication.model.dto.*;
import com.hoald.orderfoodapplication.model.entity.*;
import org.springframework.stereotype.Component;

import java.util.stream.Collectors;

@Component
public class Mapper {

    public SupplierDTO supplierToDto(Supplier supplier) {
        SupplierDTO dto = new SupplierDTO();
        dto.setAddress(supplier.getAddress());
        dto.setId(supplier.getId());
        dto.setName(supplier.getName());
        dto.setPhone(supplier.getPhone());
        dto.setOpenTime(supplier.getOpenTime());
        dto.setCloseTime(supplier.getCloseTime());
        dto.setImgPath(supplier.getImgPath());
        dto.setStatus(supplier.getStatus());
        dto.setUser(new UserDTO(supplier.getUser().getId()));
        return dto;
    }

    public SupplierDTO supplierToDtoItem(Supplier supplier) {
        SupplierDTO dto = new SupplierDTO();
        dto.setAddress(supplier.getAddress());
        dto.setId(supplier.getId());
        dto.setName(supplier.getName());
        dto.setImgPath(supplier.getImgPath());
        dto.setStatus(supplier.getStatus());
        if(supplier.getUser() != null) {
            dto.setUser(new UserDTO(supplier.getUser().getId()));
        }
        return dto;
    }

    public Supplier supplierDtoToSupplier(SupplierDTO dto) {
        Supplier supplier = new Supplier();
        supplier.setAddress(dto.getAddress());
        supplier.setPhone(dto.getPhone());
        supplier.setId(dto.getId());
        supplier.setName(dto.getName());
        supplier.setImgPath(dto.getImgPath());
        supplier.setStatus(dto.getStatus());
        supplier.setOpenTime(dto.getOpenTime());
        supplier.setCloseTime(dto.getCloseTime());
        if (dto.getUser() != null) {
            supplier.setUser(new Users(dto.getUser().getId()));
        }
        return supplier;
    }

    public SupplierDTO supplierToDtoDetail(Supplier supplier) {
        SupplierDTO dto = new SupplierDTO();
        dto.setAddress(supplier.getAddress());
        dto.setId(supplier.getId());
        dto.setName(supplier.getName());
        dto.setPhone(supplier.getPhone());
        dto.setOpenTime(supplier.getOpenTime());
        dto.setCloseTime(supplier.getCloseTime());
        dto.setImgPath(supplier.getImgPath());
        dto.setStatus(supplier.getStatus());
        double rate = supplier.getFeedbacks().stream()
                .filter(feedback -> feedback.getStarRate() != 0)
                .map(Feedback::getStarRate)
                .mapToDouble(x -> x)
                .average().orElse(0);
        dto.setRate(rate);
//        dto.setFeedbackIds(supplier.getFeedbacks().stream().map(Feedback::getId).collect(Collectors.toList()));
//        dto.setFoods(supplier.getFoods());
        dto.setUser(this.userToDTO(supplier.getUser()));
        return dto;
    }

    public FeedbackDTO feedbackToDTO(Feedback feedback) {
        FeedbackDTO dto = new FeedbackDTO();
        dto.setId(feedback.getId());
        dto.setComment(feedback.getComment());
        dto.setStarRate(feedback.getStarRate());
        dto.setCustomer(new Users(feedback.getCustomer().getId(), feedback.getCustomer().getName()));
        return dto;
    }

    public Feedback dtoToFeedback(FeedbackDTO dto) {
        Feedback feedback = new Feedback();
        feedback.setId(dto.getId());
        feedback.setComment(dto.getComment());
        feedback.setStarRate(dto.getStarRate());
        feedback.setCustomer(new Users(dto.getCustomer().getId(), dto.getCustomer().getName()));
        feedback.setSupplier(dto.getSupplier());
        return feedback;
    }

    public Users userDTOToUser(UserDTO dto) {
        Users user = new Users();
        user.setId(dto.getId());
        user.setName(dto.getName());
        user.setPhone(dto.getPhone());
        user.setAddress(dto.getAddress());
        user.setStatus(dto.getStatus());
        user.setRole(dto.getRole());
        return user;
    }

    public UserDTO userToDTO(Users user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setPhone(user.getPhone());
        dto.setAddress(user.getAddress());
        dto.setStatus(user.getStatus());
        dto.setRole(user.getRole());
        return dto;
    }

    public Role roleDTOToRole(RoleDTO dto) {
        Role role = new Role();
        role.setId(dto.getId());
        role.setName(dto.getName());
        return role;
    }


    public Orders OrderDTOToOder(OrderDTO orderDTO) {
        Orders orders = new Orders();
        orders.setTime(orderDTO.getTime());
        orders.setSupplier(orderDTO.getSupplier());
        orders.setCustomer(orderDTO.getCustomer());
        return orders;
    }

    public OrderDTO OrderToDTO(Orders order) {
        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setTime(order.getTime());
        dto.setSupplier(order.getSupplier());
        dto.setCustomer(order.getCustomer());
        dto.setStatus(order.getStatus());
        return dto;
    }

    public OrderDetail orderDetailDTOToOrderDetail(OrderDetailDTO dto) {
        OrderDetail orderDetail = new OrderDetail();
        orderDetail.setId(dto.getId());
        orderDetail.setNumOfDishes(dto.getNumOfDishes());
        orderDetail.setFood(dto.getFood());
        orderDetail.setOrder(dto.getOrder());
        return orderDetail;
    }

    public OrderDetailDTO orderDetailToDTO(OrderDetail orderDetail) {
        OrderDetailDTO dto = new OrderDetailDTO();
        dto.setId(orderDetail.getId());
        dto.setNumOfDishes(orderDetail.getNumOfDishes());
        dto.setFood(orderDetail.getFood());
        return dto;
    }

    public FoodDTO foodToDTO(Food food) {
        FoodDTO dto = new FoodDTO();
        dto.setId(food.getId());
        dto.setImgPath(food.getImgPath());
        dto.setName(food.getName());
        dto.setPrice(food.getPrice());
        dto.setStatus(food.getStatus());
        dto.setVersion(food.getVersion());
        dto.setSupplier(food.getSupplier());
        return dto;
    }


}
