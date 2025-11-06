package com.crimenet.repository;

import com.crimenet.model.SOSAlert;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import org.springframework.stereotype.Repository;

import java.util.concurrent.ExecutionException;

@Repository
public class SOSRepository {

    private final Firestore firestore;
    private static final String COLLECTION_NAME = "sos_alerts";

    public SOSRepository(Firestore firestore) {
        this.firestore = firestore;
    }

    public SOSAlert findById(String sosId) throws ExecutionException, InterruptedException {
        DocumentSnapshot document = firestore.collection(COLLECTION_NAME)
                .document(sosId)
                .get()
                .get();

        return document.exists() ? document.toObject(SOSAlert.class) : null;
    }

    public void save(SOSAlert alert) throws ExecutionException, InterruptedException {
        firestore.collection(COLLECTION_NAME)
                .document(alert.getSosId())
                .set(alert)
                .get();
    }

    public java.util.List<SOSAlert> findByStatus(String status) throws ExecutionException, InterruptedException {
        com.google.cloud.firestore.QuerySnapshot querySnapshot = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("status", status)
                .get()
                .get();

        return querySnapshot.getDocuments().stream()
                .map(doc -> doc.toObject(SOSAlert.class))
                .collect(java.util.stream.Collectors.toList());
    }

    public java.util.List<SOSAlert> findByUserId(String userId) throws ExecutionException, InterruptedException {
        com.google.cloud.firestore.QuerySnapshot querySnapshot = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("userId", userId)
                .orderBy("createdAt", com.google.cloud.firestore.Query.Direction.DESCENDING)
                .get()
                .get();

        return querySnapshot.getDocuments().stream()
                .map(doc -> doc.toObject(SOSAlert.class))
                .collect(java.util.stream.Collectors.toList());
    }
}
