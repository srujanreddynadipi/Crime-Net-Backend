package com.crimenet.service;

import com.crimenet.dto.CreateConversationRequest;
import com.crimenet.exception.NotFoundException;
import com.crimenet.model.ChatMessage;
import com.crimenet.model.Conversation;
import com.crimenet.repository.ChatMessageRepository;
import com.crimenet.repository.ConversationRepository;
import com.google.cloud.Timestamp;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

@Service
public class ChatService {

    private final ConversationRepository conversationRepository;
    private final ChatMessageRepository chatMessageRepository;

    public ChatService(ConversationRepository conversationRepository, ChatMessageRepository chatMessageRepository) {
        this.conversationRepository = conversationRepository;
        this.chatMessageRepository = chatMessageRepository;
    }

    public Conversation createConversation(CreateConversationRequest request, String createdBy)
            throws ExecutionException, InterruptedException {
        Conversation conversation = new Conversation();
        conversation.setConversationId(UUID.randomUUID().toString());
        conversation.setCreatedBy(createdBy);
        conversation.setParticipants(request.getParticipants() != null ? request.getParticipants() : new ArrayList<>());
        conversation.setIsGroup(request.getParticipants() != null && request.getParticipants().size() > 2);
        conversation.setReportId(request.getReportId());
        conversation.setCreatedAt(Timestamp.now());
        conversation.setLastMessageAt(Timestamp.now());

        conversationRepository.save(conversation);
        return conversation;
    }

    public Conversation getConversationById(String conversationId) throws ExecutionException, InterruptedException {
        Conversation conversation = conversationRepository.findById(conversationId);
        if (conversation == null) {
            throw new NotFoundException("Conversation not found: " + conversationId);
        }
        return conversation;
    }

    public List<Conversation> getUserConversations(String userId) throws ExecutionException, InterruptedException {
        return conversationRepository.findByParticipant(userId);
    }

    public ChatMessage sendMessage(String conversationId, ChatMessage message)
            throws ExecutionException, InterruptedException {
        // Verify conversation exists
        Conversation conversation = getConversationById(conversationId);

        // Set message properties
        message.setMessageId(UUID.randomUUID().toString());
        message.setCreatedAt(Timestamp.now());
        message.setDeliveredAt(Timestamp.now());

        // Save message
        chatMessageRepository.save(conversationId, message);

        // Update conversation last message time
        conversation.setLastMessageAt(Timestamp.now());
        conversationRepository.save(conversation);

        return message;
    }

    public List<ChatMessage> getMessages(String conversationId) throws ExecutionException, InterruptedException {
        // Verify conversation exists
        getConversationById(conversationId);
        return chatMessageRepository.findByConversationId(conversationId);
    }

    public void markMessageAsRead(String conversationId, String messageId)
            throws ExecutionException, InterruptedException {
        chatMessageRepository.markAsRead(conversationId, messageId);
    }
}
