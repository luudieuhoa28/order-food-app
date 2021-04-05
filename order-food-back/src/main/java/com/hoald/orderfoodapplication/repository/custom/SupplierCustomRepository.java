package com.hoald.orderfoodapplication.repository.custom;

import com.hoald.orderfoodapplication.model.entity.Supplier;
import com.hoald.orderfoodapplication.model.requestresponse.PageListItem;
import org.springframework.data.domain.Pageable;

public interface SupplierCustomRepository {
    PageListItem<Supplier> searchByTerm(String term, String userId, Pageable pageable);
}
