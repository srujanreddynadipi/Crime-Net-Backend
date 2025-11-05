package com.crimenet.repository;

import com.crimenet.model.Device;
import com.google.cloud.firestore.Firestore;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Repository
@RequiredArgsConstructor
public class DeviceRepository {
    private final Firestore firestore;
    private static final String COLLECTION_NAME = "devices";

    public Device save(Device device) throws ExecutionException, InterruptedException {
        firestore.collection(COLLECTION_NAME)
                .document(device.getUserDeviceId())
                .set(device)
                .get();
        return device;
    }

    public Optional<Device> findById(String userDeviceId) throws ExecutionException, InterruptedException {
        var doc = firestore.collection(COLLECTION_NAME)
                .document(userDeviceId)
                .get()
                .get();

        if (doc.exists()) {
            return Optional.of(doc.toObject(Device.class));
        }
        return Optional.empty();
    }

    // Find all devices for a user
    public List<Device> findByUserId(String userId) throws ExecutionException, InterruptedException {
        var querySnapshot = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("userId", userId)
                .get()
                .get();

        return querySnapshot.getDocuments()
                .stream()
                .map(doc -> doc.toObject(Device.class))
                .collect(Collectors.toList());
    }

    // Find active devices for a user (for push notifications)
    public List<Device> findActiveDevicesByUserId(String userId) throws ExecutionException, InterruptedException {
        var querySnapshot = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("userId", userId)
                .whereEqualTo("isActive", true)
                .get()
                .get();

        return querySnapshot.getDocuments()
                .stream()
                .map(doc -> doc.toObject(Device.class))
                .collect(Collectors.toList());
    }

    // Find device by FCM token (for token refresh scenarios)
    public Optional<Device> findByFcmToken(String fcmToken) throws ExecutionException, InterruptedException {
        var querySnapshot = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("fcmToken", fcmToken)
                .limit(1)
                .get()
                .get();

        if (!querySnapshot.isEmpty()) {
            return Optional.of(querySnapshot.getDocuments().get(0).toObject(Device.class));
        }
        return Optional.empty();
    }

    // Deactivate all other devices when a new primary device is registered
    public void deactivateOtherDevices(String userId, String exceptDeviceId)
            throws ExecutionException, InterruptedException {
        List<Device> devices = findByUserId(userId);
        for (Device device : devices) {
            if (!device.getUserDeviceId().equals(exceptDeviceId)) {
                device.setIsActive(false);
                save(device);
            }
        }
    }

    public void delete(String userDeviceId) throws ExecutionException, InterruptedException {
        firestore.collection(COLLECTION_NAME)
                .document(userDeviceId)
                .delete()
                .get();
    }
}
