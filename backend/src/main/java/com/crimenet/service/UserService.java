package com.crimenet.service;

import com.crimenet.exception.NotFoundException;
import com.crimenet.model.User;
import com.crimenet.repository.UserRepository;
import com.google.cloud.Timestamp;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserById(String uid) throws ExecutionException, InterruptedException {
        User user = userRepository.findById(uid);
        if (user == null) {
            throw new NotFoundException("User not found with uid: " + uid);
        }
        return user;
    }

    public void createUser(User user) throws ExecutionException, InterruptedException {
        user.setCreatedAt(Timestamp.now());
        user.setUpdatedAt(Timestamp.now());
        user.setStatus("ACTIVE");
        userRepository.save(user);
    }

    public void updateUser(String uid, User updates) throws ExecutionException, InterruptedException {
        User existing = getUserById(uid);

        if (updates.getFullName() != null)
            existing.setFullName(updates.getFullName());
        if (updates.getPhone() != null)
            existing.setPhone(updates.getPhone());
        if (updates.getAddress() != null)
            existing.setAddress(updates.getAddress());
        if (updates.getLanguagePreference() != null)
            existing.setLanguagePreference(updates.getLanguagePreference());

        existing.setUpdatedAt(Timestamp.now());
        userRepository.save(existing);
    }

    public void deleteUser(String uid) throws ExecutionException, InterruptedException {
        userRepository.delete(uid);
    }

    public List<User> getUsersByRole(String role) throws ExecutionException, InterruptedException {
        return userRepository.findByRole(role);
    }
}
