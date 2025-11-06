package com.crimenet.model;

import com.google.cloud.Timestamp;
import lombok.Data;

@Data
public class StolenItem {
    private String itemId;
    private String itemType;
    private String description;
    private String serialNumber;
    private String status; // LOST, RECOVERED
    private String location;
    private String reportId;
    private String category;
    private String brand;
    private String model;
    private String color;
    private Double estimatedValue;
    private String reportedBy;
    private Timestamp reportedAt;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
