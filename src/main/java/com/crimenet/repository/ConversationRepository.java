package com.crimenet.repository;

import com.crimenet.model.Conversation;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Repository
public class ConversationRepository {

    private final Firestore firestore;
    private static final String COLLECTION_NAME = "conversations";

    public ConversationRepository(Firestore firestore) {
        this.firestore = firestore;
    }

    public Conversation findById(String conversationId) throws ExecutionException, InterruptedException {
        DocumentSnapshot document = firestore.collection(COLLECTION_NAME)
                .document(conversationId)
                .get()
                .get();

        return document.exists() ? document.toObject(Conversation.class) : null;
    }

    public void save(Conversation conversation) throws ExecutionException, InterruptedException {
        firestore.collection(COLLECTION_NAME)
                .document(conversation.getConversationId())
                .set(conversation)
                .get();
    }

    public List<Conversation> findByParticipant(String userId) throws ExecutionException, InterruptedException {
        QuerySnapshot querySnapshot = firestore.collection(COLLECTION_NAME)
                .whereArrayContains("participants", userId)
                .orderBy("lastMessageAt", com.google.cloud.firestore.Query.Direction.DESCENDING)
                .get()
                .get();

        return querySnapshot.getDocuments().stream()
                .map(doc -> doc.toObject(Conversation.class))
                .collect(Collectors.toList());
    }

    public List<Conversation> findByReportId(String reportId) throws ExecutionException, InterruptedException {
        QuerySnapshot querySnapshot = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("reportId", reportId)
                .get()
                .get();

        return querySnapshot.getDocuments().stream()
                .map(doc -> doc.toObject(Conversation.class))
                .collect(Collectors.toList());
    }

    public void delete(String conversationId) throws ExecutionException, InterruptedException {
        firestore.collection(COLLECTION_NAME)
                .document(conversationId)
                .delete()
                .get();
    }
}
