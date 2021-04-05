package com.hoald.orderfoodapplication.service;

import com.hoald.orderfoodapplication.model.entity.Feedback;

import java.util.List;

public interface FeedbackService {
    List<Feedback> getFeedbackByIds(List<Long> ids);
    Feedback addAnFeedback(Feedback feedback);
    List<Feedback> getFeedbackBySupplierId(Long id);
}
