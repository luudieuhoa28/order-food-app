package com.hoald.orderfoodapplication.web;

import com.hoald.orderfoodapplication.util.Mapper;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class AbstractApplicationController {
    @Autowired
    Mapper mapper;
}
