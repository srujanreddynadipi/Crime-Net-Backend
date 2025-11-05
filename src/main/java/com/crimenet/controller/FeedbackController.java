package com.crimenet.controller;

import com.crimenet.model.Feedback;
import com.crimenet.security.FirebaseUserDetails;
import com.crimenet.service.FeedbackService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/feedback")
@RequiredArgsConstructor
public class FeedbackController {
    private static final Logger logger = LoggerFactory.getLogger(FeedbackController.class);
    private final FeedbackService feedbackService;

    /**
     * Submit feedback for an officer
     * POST /api/feedback
     * Body: { "userId", "officerId", "reportId", "rating", "comment" }
     */
    @PostMapping
    @PreAuthorize("hasAnyRole('CITIZEN', 'POLICE', 'ADMIN')")
    public ResponseEntity<Feedback> createFeedback(@RequestBody Map<String, Object> request)
            throws ExecutionException, InterruptedException {

        String userId = (String) request.get("userId");
        String officerId = (String) request.get("officerId");
        String reportId = (String) request.get("reportId");
        Integer rating = (Integer) request.get("rating");
        String comment = (String) request.get("comment");

        Feedback feedback = feedbackService.createFeedback(userId, officerId, reportId, rating, comment);
        return ResponseEntity.ok(feedback);
    }

    /**
     * Get feedback by ID
     * GET /api/feedback/{id}
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('POLICE', 'ADMIN')")
    public ResponseEntity<Feedback> getFeedbackById(@PathVariable String id)
            throws ExecutionException, InterruptedException {
        Feedback feedback = feedbackService.getFeedbackById(id);
        return ResponseEntity.ok(feedback);
    }

    /**
     * Get all feedback for a specific officer
     * GET /api/feedback/officer/{officerId}
     */
    @GetMapping("/officer/{officerId}")
    @PreAuthorize("hasAnyRole('POLICE', 'ADMIN')")
    public ResponseEntity<List<Feedback>> getFeedbacksByOfficer(@PathVariable String officerId)
            throws ExecutionException, InterruptedException {
        List<Feedback> feedbacks = feedbackService.getFeedbacksByOfficer(officerId);
        return ResponseEntity.ok(feedbacks);
    }

    /**
     * Get average rating for an officer
     * GET /api/feedback/officer/{officerId}/rating
     */
    @GetMapping("/officer/{officerId}/rating")
    @PreAuthorize("hasAnyRole('POLICE', 'ADMIN')")
    public ResponseEntity<Map<String, Double>> getOfficerAverageRating(@PathVariable String officerId)
            throws ExecutionException, InterruptedException {
        Double avgRating = feedbackService.getAverageRatingForOfficer(officerId);
        return ResponseEntity.ok(Map.of("averageRating", avgRating));
    }

    /**
     * Get all feedback submitted by a user
     * GET /api/feedback/user/{userId}
     */
    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('CITIZEN', 'POLICE', 'ADMIN')")
    public ResponseEntity<List<Feedback>> getFeedbacksByUser(@PathVariable String userId)
            throws ExecutionException, InterruptedException {
        try {
            List<Feedback> feedbacks = feedbackService.getFeedbacksByUser(userId);
            return ResponseEntity.ok(feedbacks);
        } catch (Exception e) {
            logger.error("Error fetching feedbacks for user {}: {}", userId, e.getMessage(), e);
            throw e;
        }
    }

    /**
     * Get current authenticated user's feedback
     * GET /api/feedback/my-feedback
     */
    @GetMapping("/my-feedback")
    @PreAuthorize("hasAnyRole('CITIZEN', 'POLICE', 'ADMIN')")
    public ResponseEntity<List<Feedback>> getMyFeedback(Authentication auth)
            throws ExecutionException, InterruptedException {
        try {
            FirebaseUserDetails userDetails = (FirebaseUserDetails) auth.getPrincipal();
            String userId = userDetails.getUid();
            List<Feedback> feedbacks = feedbackService.getFeedbacksByUser(userId);
            return ResponseEntity.ok(feedbacks);
        } catch (Exception e) {
            logger.error("Error fetching my feedbacks: {}", e.getMessage(), e);
            throw e;
        }
    }

    /**
     * Get all feedback for a specific report
     * GET /api/feedback/report/{reportId}
     */
    @GetMapping("/report/{reportId}")
    @PreAuthorize("hasAnyRole('POLICE', 'ADMIN')")
    public ResponseEntity<List<Feedback>> getFeedbacksByReport(@PathVariable String reportId)
            throws ExecutionException, InterruptedException {
        List<Feedback> feedbacks = feedbackService.getFeedbacksByReport(reportId);
        return ResponseEntity.ok(feedbacks);
    }

    /**
     * Get all feedback (admin only)
     * GET /api/feedback
     */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Feedback>> getAllFeedbacks() throws ExecutionException, InterruptedException {
        List<Feedback> feedbacks = feedbackService.getAllFeedbacks();
        return ResponseEntity.ok(feedbacks);
    }

    /**
     * Delete feedback (admin only)
     * DELETE /api/feedback/{id}
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteFeedback(@PathVariable String id)
            throws ExecutionException, InterruptedException {
        feedbackService.deleteFeedback(id);
        return ResponseEntity.noContent().build();
    }
}
