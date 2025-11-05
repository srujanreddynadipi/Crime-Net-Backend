package com.crimenet.repository;

import com.crimenet.model.Notification;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Repository
public class NotificationRepository {

    private final Firestore firestore;
    private static final String USERS_COLLECTION = "users";

    public NotificationRepository(Firestore firestore) {
        this.firestore = firestore;
    }

    public void save(String userId, Notification notification) throws ExecutionException, InterruptedException {
        firestore.collection(USERS_COLLECTION)
                .document(userId)
                .collection("notifications")
                .document(notification.getNotificationId())
                .set(notification)
                .get();
    }

    public List<Notification> findByUserId(String userId) throws ExecutionException, InterruptedException {
        QuerySnapshot querySnapshot = firestore.collection(USERS_COLLECTION)
                .document(userId)
                .collection("notifications")
                .orderBy("createdAt", com.google.cloud.firestore.Query.Direction.DESCENDING)
                .get()
                .get();

        return querySnapshot.getDocuments().stream()
                .map(doc -> doc.toObject(Notification.class))
                .collect(Collectors.toList());
    }

    public void markAsRead(String userId, String notificationId) throws ExecutionException, InterruptedException {
        firestore.collection(USERS_COLLECTION)
                .document(userId)
                .collection("notifications")
                .document(notificationId)
                .update("isRead", true)
                .get();
    }
}
