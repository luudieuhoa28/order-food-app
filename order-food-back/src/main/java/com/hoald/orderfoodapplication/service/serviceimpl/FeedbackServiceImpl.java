package com.hoald.orderfoodapplication.service.serviceimpl;

import com.hoald.orderfoodapplication.model.entity.Feedback;
import com.hoald.orderfoodapplication.repository.FeedbackRepository;
import com.hoald.orderfoodapplication.service.FeedbackService;
import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
@Service
@Transactional
public class FeedbackServiceImpl implements FeedbackService {

    @Autowired
    FeedbackRepository feedbackRepository;

    @Override
    public List<Feedback> getFeedbackByIds(List<Long> ids) {
        return  feedbackRepository.findAllById(ids);
    }

    @Override
    public Feedback addAnFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    @Override
    public List<Feedback> getFeedbackBySupplierId(Long id) {
        return feedbackRepository.findBySupplierId(id);
    }
}
