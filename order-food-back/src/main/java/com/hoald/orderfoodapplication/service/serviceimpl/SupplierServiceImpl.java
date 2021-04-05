package com.hoald.orderfoodapplication.service.serviceimpl;

import com.hoald.orderfoodapplication.model.entity.Supplier;
import com.hoald.orderfoodapplication.model.exception.SupplierNameExistException;
import com.hoald.orderfoodapplication.model.exception.SupplierNotExistException;
import com.hoald.orderfoodapplication.model.requestresponse.PageListItem;
import com.hoald.orderfoodapplication.repository.SupplierRepository;
import com.hoald.orderfoodapplication.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Primary
public class SupplierServiceImpl implements SupplierService {
    @Autowired
    SupplierRepository supplierRepository;

    @Override
    public PageListItem<Supplier> searchByTerm(String term,String userId, Pageable pageable) {
        return supplierRepository.searchByTerm(term, userId,pageable);
    }

    @Override
    public Optional<Supplier> getById(Long id) {
        return supplierRepository.findById(id);
    }

    @Override
    public List<Supplier> getByUserId(String userId) {
        return supplierRepository.findByUserId(userId);
    }

    @Override
    public Supplier createNew(Supplier supplier) {
        if (this.supplierRepository.findByName(supplier.getName()) != null) {
            throw new SupplierNameExistException("This name existed!!!");
        }
        return this.supplierRepository.save(supplier);
    }

    @Override
    public Supplier update(Supplier updateSupplier) {
        Optional<Supplier> optional = this.supplierRepository.findById(updateSupplier.getId());
        if (optional.isPresent()) {
            Supplier supplier = optional.get();
            if (updateSupplier.getName() != null) {
                if (this.supplierRepository.findByName(updateSupplier.getName()) != null
                && !updateSupplier.getId().equals(this.supplierRepository.findByName(updateSupplier.getName()).getId())) {
                    throw new SupplierNameExistException("This name existed!!!");
                }
                supplier.setName(updateSupplier.getName());
            }

            if (updateSupplier.getAddress() != null) {
                supplier.setAddress(updateSupplier.getAddress());
            }

            if (updateSupplier.getPhone() != null) {
                supplier.setPhone(updateSupplier.getPhone());
            }

            if (updateSupplier.getOpenTime() != null) {
                supplier.setOpenTime(updateSupplier.getOpenTime());
            }

            if (updateSupplier.getCloseTime() != null) {
                supplier.setCloseTime(updateSupplier.getCloseTime());
            }

            if (updateSupplier.getStatus() != null) {
                supplier.setStatus(updateSupplier.getStatus());
            }
            return this.supplierRepository.save(supplier);
        }
        throw new SupplierNotExistException("This supplier does not exist!!!");
    }

}
