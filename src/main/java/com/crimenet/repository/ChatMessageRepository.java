package com.crimenet.repository;

import com.crimenet.model.ChatMessage;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Repository
public class ChatMessageRepository {

    private final Firestore firestore;
    private static final String CONVERSATIONS_COLLECTION = "conversations";

    public ChatMessageRepository(Firestore firestore) {
        this.firestore = firestore;
    }

    public void save(String conversationId, ChatMessage message) throws ExecutionException, InterruptedException {
        firestore.collection(CONVERSATIONS_COLLECTION)
                .document(conversationId)
                .collection("messages")
                .document(message.getMessageId())
                .set(message)
                .get();
    }

    public List<ChatMessage> findByConversationId(String conversationId)
            throws ExecutionException, InterruptedException {
        QuerySnapshot querySnapshot = firestore.collection(CONVERSATIONS_COLLECTION)
                .document(conversationId)
                .collection("messages")
                .orderBy("createdAt", com.google.cloud.firestore.Query.Direction.ASCENDING)
                .get()
                .get();

        return querySnapshot.getDocuments().stream()
                .map(doc -> doc.toObject(ChatMessage.class))
                .collect(Collectors.toList());
    }

    public void markAsRead(String conversationId, String messageId) throws ExecutionException, InterruptedException {
        firestore.collection(CONVERSATIONS_COLLECTION)
                .document(conversationId)
                .collection("messages")
                .document(messageId)
                .update("readAt", com.google.cloud.Timestamp.now())
                .get();
    }
}
