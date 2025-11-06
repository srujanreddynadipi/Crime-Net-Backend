package com.crimenet.model;

import com.google.cloud.Timestamp;
import lombok.Data;

@Data
public class Attachment {
    private String attachmentId;
    private String uploaderUserId;
    private String type; // IMAGE, VIDEO, AUDIO, DOC
    private String url;
    private String metadataJson;
    private Timestamp createdAt;
}
