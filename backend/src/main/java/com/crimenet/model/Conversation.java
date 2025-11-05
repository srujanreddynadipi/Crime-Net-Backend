package com.crimenet.model;

import com.google.cloud.Timestamp;
import lombok.Data;

@Data
public class Conversation {
    private String conversationId;
    private String createdBy;
    private Boolean isGroup;
    private String reportId;
    private java.util.List<String> participants; // List of user IDs
    private Timestamp lastMessageAt;
    private Timestamp createdAt;
}
