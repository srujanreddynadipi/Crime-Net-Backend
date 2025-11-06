package com.crimenet.repository;

import com.crimenet.model.User;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Repository
public class UserRepository {

    private final Firestore firestore;
    private static final String COLLECTION_NAME = "users";

    public UserRepository(Firestore firestore) {
        this.firestore = firestore;
    }

    public User findById(String uid) throws ExecutionException, InterruptedException {
        DocumentSnapshot document = firestore.collection(COLLECTION_NAME)
                .document(uid)
                .get()
                .get();

        return document.exists() ? document.toObject(User.class) : null;
    }

    public void save(User user) throws ExecutionException, InterruptedException {
        firestore.collection(COLLECTION_NAME)
                .document(user.getUid())
                .set(user)
                .get();
    }

    public List<User> findByRole(String role) throws ExecutionException, InterruptedException {
        QuerySnapshot querySnapshot = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("role", role)
                .get()
                .get();

        return querySnapshot.getDocuments().stream()
                .map(doc -> doc.toObject(User.class))
                .collect(Collectors.toList());
    }

    public void delete(String uid) throws ExecutionException, InterruptedException {
        firestore.collection(COLLECTION_NAME)
                .document(uid)
                .delete()
                .get();
    }
}
