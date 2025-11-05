package com.crimenet.model;

import com.google.cloud.Timestamp;
import lombok.Data;

@Data
public class ReportTimeline {
    private String timelineId;
    private String statusFrom;
    private String statusTo;
    private String note;
    private String actorUserId;
    private Timestamp createdAt;
}
