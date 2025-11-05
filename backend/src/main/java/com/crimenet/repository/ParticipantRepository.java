package com.crimenet.repository;

import com.crimenet.model.Participant;
import com.google.cloud.firestore.Firestore;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class ParticipantRepository {
    private final Firestore firestore;
    private static final String COLLECTION_NAME = "participants";

    public Participant save(Participant participant) throws ExecutionException, InterruptedException {
        firestore.collection(COLLECTION_NAME)
                .document(participant.getParticipantId())
                .set(participant)
                .get();
        return participant;
    }

    public Optional<Participant> findById(String participantId) throws ExecutionException, InterruptedException {
        var doc = firestore.collection(COLLECTION_NAME)
                .document(participantId)
                .get()
                .get();

        if (doc.exists()) {
            return Optional.of(doc.toObject(Participant.class));
        }
        return Optional.empty();
    }

    // Find all participants in a conversation
    public List<Participant> findByConversationId(String conversationId)
            throws ExecutionException, InterruptedException {
        var querySnapshot = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("conversationId", conversationId)
                .get()
                .get();

        return querySnapshot.getDocuments()
                .stream()
                .map(doc -> doc.toObject(Participant.class))
                .collect(Collectors.toList());
    }

    // Find all conversations a user is part of
    public List<Participant> findByUserId(String userId) throws ExecutionException, InterruptedException {
        var querySnapshot = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("userId", userId)
                .get()
                .get();

        return querySnapshot.getDocuments()
                .stream()
                .map(doc -> doc.toObject(Participant.class))
                .collect(Collectors.toList());
    }

    // Check if a user is a participant in a conversation
    public boolean isUserInConversation(String conversationId, String userId)
            throws ExecutionException, InterruptedException {
        var querySnapshot = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("conversationId", conversationId)
                .whereEqualTo("userId", userId)
                .limit(1)
                .get()
                .get();

        return !querySnapshot.isEmpty();
    }

    // Update unread count for a participant
    public void updateUnreadCount(String participantId, Integer unreadCount)
            throws ExecutionException, InterruptedException {
        firestore.collection(COLLECTION_NAME)
                .document(participantId)
                .update("unreadCount", unreadCount)
                .get();
    }

    // Reset unread count when user reads messages
    public void resetUnreadCount(String conversationId, String userId) throws ExecutionException, InterruptedException {
        List<Participant> participants = findByConversationId(conversationId);
        for (Participant participant : participants) {
            if (participant.getUserId().equals(userId)) {
                participant.setUnreadCount(0);
                save(participant);
                break;
            }
        }
    }

    // Increment unread count for all participants except sender
    public void incrementUnreadCountExcept(String conversationId, String exceptUserId)
            throws ExecutionException, InterruptedException {
        List<Participant> participants = findByConversationId(conversationId);
        for (Participant participant : participants) {
            if (!participant.getUserId().equals(exceptUserId)) {
                participant
                        .setUnreadCount((participant.getUnreadCount() != null ? participant.getUnreadCount() : 0) + 1);
                save(participant);
            }
        }
    }

    public void delete(String participantId) throws ExecutionException, InterruptedException {
        firestore.collection(COLLECTION_NAME)
                .document(participantId)
                .delete()
                .get();
    }

    // Remove user from conversation
    public void removeUserFromConversation(String conversationId, String userId)
            throws ExecutionException, InterruptedException {
        List<Participant> participants = findByConversationId(conversationId);
        for (Participant participant : participants) {
            if (participant.getUserId().equals(userId)) {
                delete(participant.getParticipantId());
                break;
            }
        }
    }
}
