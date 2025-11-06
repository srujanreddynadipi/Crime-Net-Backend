package com.crimenet.repository;

import com.crimenet.model.AnonymousTip;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Repository
public class TipRepository {

    private final Firestore firestore;
    private static final String COLLECTION_NAME = "tips";

    public TipRepository(Firestore firestore) {
        this.firestore = firestore;
    }

    public AnonymousTip findById(String tipId) throws ExecutionException, InterruptedException {
        DocumentSnapshot document = firestore.collection(COLLECTION_NAME)
                .document(tipId)
                .get()
                .get();

        return document.exists() ? document.toObject(AnonymousTip.class) : null;
    }

    public AnonymousTip findByTrackingCode(String trackingCode) throws ExecutionException, InterruptedException {
        QuerySnapshot querySnapshot = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("trackingCode", trackingCode)
                .limit(1)
                .get()
                .get();

        return querySnapshot.isEmpty() ? null : querySnapshot.getDocuments().get(0).toObject(AnonymousTip.class);
    }

    public void save(AnonymousTip tip) throws ExecutionException, InterruptedException {
        firestore.collection(COLLECTION_NAME)
                .document(tip.getTipId())
                .set(tip)
                .get();
    }

    public List<AnonymousTip> findAll() throws ExecutionException, InterruptedException {
        QuerySnapshot querySnapshot = firestore.collection(COLLECTION_NAME)
                .get()
                .get();

        return querySnapshot.getDocuments().stream()
                .map(doc -> doc.toObject(AnonymousTip.class))
                .collect(Collectors.toList());
    }

    public List<AnonymousTip> findByUserId(String userId) throws ExecutionException, InterruptedException {
        QuerySnapshot querySnapshot = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("userId", userId)
                .get()
                .get();

        return querySnapshot.getDocuments().stream()
                .map(doc -> doc.toObject(AnonymousTip.class))
                .collect(Collectors.toList());
    }
}
