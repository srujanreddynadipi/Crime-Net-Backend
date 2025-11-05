package com.crimenet.controller;

import com.crimenet.dto.CreateConversationRequest;
import com.crimenet.model.ChatMessage;
import com.crimenet.model.Conversation;
import com.crimenet.security.FirebaseUserDetails;
import com.crimenet.service.ChatService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {
    private static final Logger logger = LoggerFactory.getLogger(ChatController.class);
    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping("/conversations")
    @PreAuthorize("hasAnyRole('CITIZEN', 'POLICE', 'ADMIN')")
    public ResponseEntity<Conversation> createConversation(
            @Valid @RequestBody CreateConversationRequest request,
            Authentication auth) {
        try {
            FirebaseUserDetails userDetails = (FirebaseUserDetails) auth.getPrincipal();
            Conversation conversation = chatService.createConversation(request, userDetails.getUid());
            return ResponseEntity.ok(conversation);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/conversations/{conversationId}")
    @PreAuthorize("hasAnyRole('CITIZEN', 'POLICE', 'ADMIN')")
    public ResponseEntity<Conversation> getConversation(@PathVariable String conversationId) {
        try {
            Conversation conversation = chatService.getConversationById(conversationId);
            return ResponseEntity.ok(conversation);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/conversations")
    @PreAuthorize("hasAnyRole('CITIZEN', 'POLICE', 'ADMIN')")
    public ResponseEntity<List<Conversation>> getUserConversations(Authentication auth) {
        try {
            FirebaseUserDetails userDetails = (FirebaseUserDetails) auth.getPrincipal();
            logger.info("Fetching conversations for user: {}", userDetails.getUid());
            List<Conversation> conversations = chatService.getUserConversations(userDetails.getUid());
            logger.info("Found {} conversations", conversations.size());
            return ResponseEntity.ok(conversations);
        } catch (Exception e) {
            logger.error("Error fetching conversations: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/conversations/{conversationId}/messages")
    @PreAuthorize("hasAnyRole('CITIZEN', 'POLICE', 'ADMIN')")
    public ResponseEntity<List<ChatMessage>> getMessages(@PathVariable String conversationId) {
        try {
            List<ChatMessage> messages = chatService.getMessages(conversationId);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/conversations/{conversationId}/messages")
    @PreAuthorize("hasAnyRole('CITIZEN', 'POLICE', 'ADMIN')")
    public ResponseEntity<ChatMessage> sendMessage(
            @PathVariable String conversationId,
            @RequestBody ChatMessage message,
            Authentication auth) {
        try {
            FirebaseUserDetails userDetails = (FirebaseUserDetails) auth.getPrincipal();
            message.setSenderId(userDetails.getUid());
            ChatMessage sent = chatService.sendMessage(conversationId, message);
            return ResponseEntity.ok(sent);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/conversations/{conversationId}/messages/{messageId}/read")
    @PreAuthorize("hasAnyRole('CITIZEN', 'POLICE', 'ADMIN')")
    public ResponseEntity<Void> markAsRead(
            @PathVariable String conversationId,
            @PathVariable String messageId) {
        try {
            chatService.markMessageAsRead(conversationId, messageId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
