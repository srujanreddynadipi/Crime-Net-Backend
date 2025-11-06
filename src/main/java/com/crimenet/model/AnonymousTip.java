package com.crimenet.model;

import com.google.cloud.Timestamp;
import lombok.Data;

@Data
public class AnonymousTip {
    private String tipId; // PK
    private String title;
    private String description;
    private String location;
    private Double latitude;
    private Double longitude;
    private String category;
    private String trackingCode; // Unique (e.g., "TIP-{timestamp}")
    private String pinCode; // Optional PIN for privacy-protected retrieval
    private String status; // RECEIVED, VERIFIED, ACTIONED
    private String mediaUrl;
    private Timestamp lastUpdatedAt; // Track when tip was last modified
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
