package com.hoald.orderfoodapplication.repository.custom;

import com.hoald.orderfoodapplication.model.entity.QFood;
import com.hoald.orderfoodapplication.model.entity.QSupplier;
import com.hoald.orderfoodapplication.model.entity.Supplier;
import com.hoald.orderfoodapplication.model.requestresponse.PageListItem;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.data.domain.Pageable;
import org.thymeleaf.util.StringUtils;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public class SupplierCustomRepositoryImpl implements SupplierCustomRepository {
    @PersistenceContext
    private EntityManager em;

    //if innerJoin with food table, then cannot get supplier with no food
    @Override
    public PageListItem<Supplier> searchByTerm(String term, String userId, Pageable pageable) {
        BooleanBuilder builder = new BooleanBuilder();
        builder.or(QSupplier.supplier.name.containsIgnoreCase(term)
                .or(QSupplier.supplier.address.containsIgnoreCase(term)))
        .and(QSupplier.supplier.status.eq("AVAILABLE"));
//                .or(QSupplier.supplier.foods));

        //.or(QFood.food.name.containsIgnoreCase(term))

        if (!StringUtils.isEmpty(userId)) {
            builder.and(QSupplier.supplier.user.id.eq(userId));
        }

        JPAQuery<Supplier> query = new JPAQuery<Supplier>(em).distinct()
                .from(QSupplier.supplier)
//                .innerJoin(QSupplier.supplier.foods, QFood.food)
                .where(builder);

        long totalItems = query.fetchCount();
        List<Supplier> listSupplier = query.limit(pageable.getPageSize())
                .offset(pageable.getPageSize() * pageable.getPageNumber())
                .fetch();
        return new PageListItem<>(listSupplier, pageable, totalItems);
    }
}
