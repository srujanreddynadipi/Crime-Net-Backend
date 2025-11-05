package com.crimenet.model;

import com.google.cloud.Timestamp;
import lombok.Data;

@Data
public class Feedback {
    private String feedbackId;
    private String userId; // FK → User
    private String officerId; // FK → Officer
    private String reportId; // FK → CrimeReport (optional, to contextualize feedback)
    private Integer rating; // 1-5 (constraint validation in service layer)
    private String comment;
    private Timestamp createdAt;
}
