package com.crimenet.service;

import com.crimenet.model.Feedback;
import com.crimenet.repository.FeedbackRepository;
import com.google.cloud.Timestamp;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
public class FeedbackService {
    private final FeedbackRepository feedbackRepository;

    public Feedback createFeedback(String userId, String officerId, String reportId, Integer rating, String comment)
            throws ExecutionException, InterruptedException {

        // Validate rating (1-5)
        if (rating == null || rating < 1 || rating > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5");
        }

        Feedback feedback = new Feedback();
        feedback.setFeedbackId(UUID.randomUUID().toString());
        feedback.setUserId(userId);
        feedback.setOfficerId(officerId);
        feedback.setReportId(reportId);
        feedback.setRating(rating);
        feedback.setComment(comment);
        feedback.setCreatedAt(Timestamp.now());

        return feedbackRepository.save(feedback);
    }

    public Feedback getFeedbackById(String feedbackId) throws ExecutionException, InterruptedException {
        return feedbackRepository.findById(feedbackId)
                .orElseThrow(() -> new RuntimeException("Feedback not found with id: " + feedbackId));
    }

    public List<Feedback> getFeedbacksByUser(String userId) throws ExecutionException, InterruptedException {
        return feedbackRepository.findByUserId(userId);
    }

    public List<Feedback> getFeedbacksByOfficer(String officerId) throws ExecutionException, InterruptedException {
        return feedbackRepository.findByOfficerId(officerId);
    }

    public List<Feedback> getFeedbacksByReport(String reportId) throws ExecutionException, InterruptedException {
        return feedbackRepository.findByReportId(reportId);
    }

    public List<Feedback> getAllFeedbacks() throws ExecutionException, InterruptedException {
        return feedbackRepository.findAll();
    }

    // Get officer performance stats
    public Double getAverageRatingForOfficer(String officerId) throws ExecutionException, InterruptedException {
        return feedbackRepository.getAverageRatingByOfficer(officerId);
    }

    public void deleteFeedback(String feedbackId) throws ExecutionException, InterruptedException {
        feedbackRepository.delete(feedbackId);
    }
}
