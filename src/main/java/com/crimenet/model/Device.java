package com.crimenet.model;

import com.google.cloud.Timestamp;
import lombok.Data;

/**
 * Device model for managing FCM push notification tokens
 * Each user can have multiple devices (phone, tablet, etc.)
 */
@Data
public class Device {
    private String userDeviceId; // PK
    private String userId; // FK → User
    private String fcmToken; // Firebase Cloud Messaging token
    private String deviceType; // ANDROID, IOS, WEB
    private String deviceName; // Optional: "User's iPhone", "Chrome on Windows"
    private Boolean isActive; // For disabling old devices
    private Timestamp lastSeenAt;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
