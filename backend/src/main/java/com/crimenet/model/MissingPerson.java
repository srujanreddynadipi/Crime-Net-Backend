package com.crimenet.model;

import com.google.cloud.Timestamp;
import lombok.Data;

@Data
public class MissingPerson {
    private String caseId; // PK
    private String name;
    private Integer age;
    private String gender;
    private String lastSeenLocation;
    private String photoUrl;
    private String status; // OPEN, FOUND, DECEASED
    private String statusReason; // Additional context (e.g., "Found safe", "Located in hospital")
    private String reportedBy; // FK → User/Officer
    private Timestamp reportedAt;
    private Timestamp lastSeenAt;
    private Integer heightCm;
    private String build; // SLIM, AVERAGE, HEAVY, ATHLETIC
    private String distinguishingMarks; // Expanded description (scars, tattoos, birthmarks)
    private Double rewardAmount;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
