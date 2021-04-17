package com.hoald.orderfoodapplication.repository;

import com.hoald.orderfoodapplication.model.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    List<Feedback> findBySupplierId(Long supplierId);
    void deleteById(Long feedbackId);
}
