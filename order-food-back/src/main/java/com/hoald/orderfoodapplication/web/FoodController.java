package com.hoald.orderfoodapplication.web;

import com.hoald.orderfoodapplication.model.dto.FoodDTO;
import com.hoald.orderfoodapplication.model.entity.Food;
import com.hoald.orderfoodapplication.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/foods")
public class FoodController extends AbstractApplicationController {

    @Autowired
    private FoodService foodService;

    @GetMapping("/getBySupplierId")
    public ResponseEntity<List<FoodDTO>> getFoodBySupplierId(@RequestParam Long supplierId) {
        List<FoodDTO> foodDTOS = this.foodService.getFoodsBySupplierId(supplierId)
                .stream()
                .map(mapper::foodToDTO)
                .collect(Collectors.toList());
        return new ResponseEntity<>(foodDTOS, HttpStatus.OK);
    }

    @PostMapping("/supplier/create")
    public ResponseEntity<FoodDTO> createFood(@RequestBody Food food) {
        FoodDTO foodDTO = mapper.foodToDTO(this.foodService.createFood(food));
        return new ResponseEntity<>(foodDTO, HttpStatus.OK);
    }

    @PostMapping("/supplier/update")
    public ResponseEntity<FoodDTO> updateFood(@RequestBody Food food) {
        FoodDTO foodDTO = mapper.foodToDTO(this.foodService.updateFood(food));
        return new ResponseEntity<>(foodDTO, HttpStatus.OK);
    }
}
