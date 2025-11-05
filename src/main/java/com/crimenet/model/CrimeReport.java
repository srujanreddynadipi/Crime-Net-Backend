package com.crimenet.model;

import com.google.cloud.Timestamp;
import lombok.Data;

@Data
public class CrimeReport {
    private String reportId;
    private String userId;
    private String assignedOfficerId;
    private String stationId;
    private String title;
    private String description;
    private String category; // THEFT, ASSAULT, VANDALISM, etc.
    private String priority; // LOW, MEDIUM, HIGH
    private String location;
    private Double latitude;
    private Double longitude;
    private Timestamp incidentAt;
    private String caseNumber;
    private Boolean isAnonymous;
    private String status; // PENDING, UNDER_INVESTIGATION, CLOSED
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
