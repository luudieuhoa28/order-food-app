package com.hoald.orderfoodapplication.web;

import com.hoald.orderfoodapplication.model.dto.SupplierDTO;
import com.hoald.orderfoodapplication.model.entity.Supplier;
import com.hoald.orderfoodapplication.model.exception.SupplierNotExistException;
import com.hoald.orderfoodapplication.model.requestresponse.PageListItem;
import com.hoald.orderfoodapplication.service.RoleService;
import com.hoald.orderfoodapplication.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/suppliers")
public class SupplierController extends AbstractApplicationController {
    @Autowired
    SupplierService supplierService;

    @Autowired
    RoleService roleService;

    @GetMapping("/searchByTerm")
    public ResponseEntity<PageListItem<SupplierDTO>> searchByTerm(@RequestParam String term,
                                                                  @RequestParam int pageNumber,
                                                                  @RequestParam int pageSize,
                                                                  @RequestParam String userId) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        PageListItem<Supplier> pageListSupplier = supplierService.searchByTerm(term, userId, pageable);
        List<SupplierDTO> supplierDTOS = pageListSupplier.getListItem().stream()
                .map(mapper::supplierToDtoItem)
                .collect(Collectors.toList());

        PageListItem<SupplierDTO> supplierDTOPageListItem = new PageListItem<>(supplierDTOS,
                pageListSupplier.getPageable(),
                pageListSupplier.getTotalItem());

        return new ResponseEntity<>(supplierDTOPageListItem, HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<SupplierDTO> getSupplier(@PathVariable Long id) {
        if (supplierService.getById(id).isPresent()) {
            Supplier supplier = supplierService.getById(id).get();
            SupplierDTO dto = mapper.supplierToDtoDetail(supplier);
            return new ResponseEntity<>(dto, HttpStatus.OK);
        }
        throw new SupplierNotExistException("this supplier id does not exist!!!");
    }


    @GetMapping("/getByUserId")
    public ResponseEntity<List<SupplierDTO>> getSupplierByUserId(@RequestParam String userId) {
        List<SupplierDTO> supplierDTOS = this.supplierService.getByUserId(userId).stream()
                .map(mapper::supplierToDtoItem)
                .collect(Collectors.toList());
        return new ResponseEntity<>(supplierDTOS, HttpStatus.OK);
    }

    @PostMapping("/supplier/create")
    public ResponseEntity<SupplierDTO> create(@RequestBody SupplierDTO dto) {
        Supplier supplier = supplierService.createNew(mapper.supplierDtoToSupplier(dto));
        return new ResponseEntity<>(mapper.supplierToDto(supplier), HttpStatus.OK);
    }

    @PostMapping("/supplier/update")
    public ResponseEntity<SupplierDTO> update(@RequestBody SupplierDTO dto) {
        Supplier supplier = supplierService.update(mapper.supplierDtoToSupplier(dto));
        return new ResponseEntity<>(mapper.supplierToDto(supplier), HttpStatus.OK);
    }

}
