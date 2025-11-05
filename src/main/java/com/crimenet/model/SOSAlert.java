package com.crimenet.model;

import com.google.cloud.Timestamp;
import lombok.Data;

@Data
public class SOSAlert {
    private String sosId;
    private String userId;
    private Double latitude;
    private Double longitude;
    private String address;
    private Double accuracy;
    private String mediaStreamUrl;
    private Timestamp triggeredAt;
    private String status; // ACTIVE, HANDLED
    private Timestamp handledAt;
    private String handledByOfficerId;
    private String severity;
    private String notes;
    private String deviceInfoJson;
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
