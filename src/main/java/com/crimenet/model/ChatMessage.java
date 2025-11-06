package com.crimenet.model;

import com.google.cloud.Timestamp;
import lombok.Data;

@Data
public class ChatMessage {
    private String messageId; // PK
    private String conversationId; // FK → Conversation
    private String senderId; // FK → User
    private String content;
    private String mediaUrl;
    private String type; // TEXT, AUDIO, VIDEO
    private Timestamp deliveredAt;
    private Timestamp readAt;
    private String replyToMessageId; // FK → ChatMessage (for threading)
    private Boolean isDeleted; // Soft delete for chat messages
    private Timestamp createdAt;
}
