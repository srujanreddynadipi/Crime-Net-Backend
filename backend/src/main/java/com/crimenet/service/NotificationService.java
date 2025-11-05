package com.crimenet.service;

import com.crimenet.model.Notification;
import com.crimenet.repository.NotificationRepository;
import com.google.cloud.Timestamp;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    public Notification createNotification(String userId, Notification notification)
            throws ExecutionException, InterruptedException {
        notification.setNotificationId(UUID.randomUUID().toString());
        notification.setDeliveryStatus("PENDING");
        notification.setIsRead(false);
        notification.setCreatedAt(Timestamp.now());
        notificationRepository.save(userId, notification);
        return notification;
    }

    public List<Notification> getNotificationsByUser(String userId) throws ExecutionException, InterruptedException {
        return notificationRepository.findByUserId(userId);
    }

    public void markAsRead(String userId, String notificationId) throws ExecutionException, InterruptedException {
        notificationRepository.markAsRead(userId, notificationId);
    }
}
