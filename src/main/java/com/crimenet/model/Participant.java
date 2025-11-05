package com.crimenet.model;

import com.google.cloud.Timestamp;
import lombok.Data;

/**
 * Participant model for tracking conversation membership
 * Links users to conversations with their role and unread message count
 */
@Data
public class Participant {
    private String participantId; // PK
    private String conversationId; // FK → Conversation
    private String userId; // FK → User
    private String roleInChat; // OWNER, MEMBER, ADMIN (for group chats)
    private Integer unreadCount; // Number of unread messages for this user
    private Timestamp joinedAt;
    private Timestamp lastReadAt; // Last time user read messages
    private Timestamp createdAt;
}
