package com.crimenet.model;

import com.google.cloud.Timestamp;
import lombok.Data;

@Data
public class Notification {
    private String notificationId; // PK
    private String userId; // FK → User (subcollection key)
    private String message;
    private String type; // STATUS_UPDATE, ALERT, REMINDER
    private String priority; // LOW, MEDIUM, HIGH, URGENT
    private String targetUrl; // Deep link
    private String deliveryStatus; // PENDING, SENT, FAILED
    private String userDeviceId; // FK → Device (optional, for per-device tracking)
    private Boolean isRead;
    private Timestamp expiresAt;
    private Timestamp createdAt;
}
