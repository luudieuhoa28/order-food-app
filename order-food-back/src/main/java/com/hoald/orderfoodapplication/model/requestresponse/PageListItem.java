package com.hoald.orderfoodapplication.model.requestresponse;

import org.springframework.data.domain.Pageable;

import java.util.List;

public class PageListItem<T> {
    private List<T> listItem;
    private Pageable pageable;
    private long totalItem;

    public PageListItem() {
    }

    public PageListItem(List<T> listItem, Pageable pageable, long totalPage) {
        this.listItem = listItem;
        this.pageable = pageable;
        this.totalItem = totalPage;
    }

    public List<T> getListItem() {
        return listItem;
    }

    public void setListItem(List<T> listItem) {
        this.listItem = listItem;
    }

    public Pageable getPageable() {
        return pageable;
    }

    public void setPageable(Pageable pageable) {
        this.pageable = pageable;
    }

    public long getTotalItem() {
        return totalItem;
    }

    public void setTotalItem(long totalItem) {
        this.totalItem = totalItem;
    }
}
