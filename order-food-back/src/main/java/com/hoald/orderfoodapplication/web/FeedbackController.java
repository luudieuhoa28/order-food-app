package com.hoald.orderfoodapplication.web;

import com.hoald.orderfoodapplication.model.dto.FeedbackDTO;
import com.hoald.orderfoodapplication.model.entity.Feedback;
import com.hoald.orderfoodapplication.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/feedbacks")
public class FeedbackController extends AbstractApplicationController {
    @Autowired
    FeedbackService feedbackService;

    @GetMapping("/getByIds/{ids}")
    public ResponseEntity<List<FeedbackDTO>> getFeedbackByIds(@PathVariable Long[] ids) {
        List<FeedbackDTO> feedbackDTOs = feedbackService.getFeedbackByIds(Arrays.asList(ids))
                .stream()
                .map(mapper::feedbackToDTO)
                .collect(Collectors.toList());
        return new ResponseEntity<>(feedbackDTOs, HttpStatus.OK);
    }

    @GetMapping("/getBySupplierId")
    public ResponseEntity<List<FeedbackDTO>> getFeedbackBySupplierId(@RequestParam Long supplierId) {
        List<FeedbackDTO> feedbackDTOs = feedbackService.getFeedbackBySupplierId(supplierId)
                .stream()
                .map(mapper::feedbackToDTO)
                .collect(Collectors.toList());
        return new ResponseEntity<>(feedbackDTOs, HttpStatus.OK);
    }

    @PostMapping("/customersupplier/create")
    public ResponseEntity<FeedbackDTO> createFeedback(@RequestBody FeedbackDTO feedbackDTO) {
        Feedback feedback = mapper.dtoToFeedback(feedbackDTO);
        feedback = feedbackService.addAnFeedback(feedback);
        return new ResponseEntity<>(mapper.feedbackToDTO(feedback), HttpStatus.OK);
    }
}
