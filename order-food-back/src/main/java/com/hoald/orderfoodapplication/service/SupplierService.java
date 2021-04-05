package com.hoald.orderfoodapplication.service;

import com.hoald.orderfoodapplication.model.entity.Supplier;
import com.hoald.orderfoodapplication.model.requestresponse.PageListItem;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface SupplierService {
    PageListItem<Supplier> searchByTerm(String term, String userId, Pageable pageable);
    Optional<Supplier> getById(Long id);
    List<Supplier> getByUserId(String userId);
    Supplier createNew(Supplier supplier);
    Supplier update(Supplier updateSupplier);
}
