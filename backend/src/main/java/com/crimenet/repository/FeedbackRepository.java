package com.crimenet.repository;

import com.crimenet.model.Feedback;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class FeedbackRepository {
    private final Firestore firestore;
    private static final String COLLECTION_NAME = "feedback";

    public Feedback save(Feedback feedback) throws ExecutionException, InterruptedException {
        firestore.collection(COLLECTION_NAME)
                .document(feedback.getFeedbackId())
                .set(feedback)
                .get();
        return feedback;
    }

    public Optional<Feedback> findById(String feedbackId) throws ExecutionException, InterruptedException {
        var doc = firestore.collection(COLLECTION_NAME)
                .document(feedbackId)
                .get()
                .get();

        if (doc.exists()) {
            return Optional.of(doc.toObject(Feedback.class));
        }
        return Optional.empty();
    }

    public List<Feedback> findByUserId(String userId) throws ExecutionException, InterruptedException {
        var querySnapshot = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("userId", userId)
                .get()
                .get();

        return querySnapshot.getDocuments()
                .stream()
                .map(doc -> doc.toObject(Feedback.class))
                .collect(Collectors.toList());
    }

    public List<Feedback> findByOfficerId(String officerId) throws ExecutionException, InterruptedException {
        var querySnapshot = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("officerId", officerId)
                .get()
                .get();

        return querySnapshot.getDocuments()
                .stream()
                .map(doc -> doc.toObject(Feedback.class))
                .collect(Collectors.toList());
    }

    public List<Feedback> findByReportId(String reportId) throws ExecutionException, InterruptedException {
        var querySnapshot = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("reportId", reportId)
                .get()
                .get();

        return querySnapshot.getDocuments()
                .stream()
                .map(doc -> doc.toObject(Feedback.class))
                .collect(Collectors.toList());
    }

    // Get all feedback (for admin/analytics)
    public List<Feedback> findAll() throws ExecutionException, InterruptedException {
        var querySnapshot = firestore.collection(COLLECTION_NAME)
                .get()
                .get();

        return querySnapshot.getDocuments()
                .stream()
                .map(doc -> doc.toObject(Feedback.class))
                .collect(Collectors.toList());
    }

    // Calculate average rating for an officer
    public Double getAverageRatingByOfficer(String officerId) throws ExecutionException, InterruptedException {
        List<Feedback> feedbacks = findByOfficerId(officerId);
        if (feedbacks.isEmpty()) {
            return 0.0;
        }

        double sum = feedbacks.stream()
                .mapToInt(Feedback::getRating)
                .sum();
        return sum / feedbacks.size();
    }

    public void delete(String feedbackId) throws ExecutionException, InterruptedException {
        firestore.collection(COLLECTION_NAME)
                .document(feedbackId)
                .delete()
                .get();
    }
}
