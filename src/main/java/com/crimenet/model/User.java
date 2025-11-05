package com.crimenet.model;

import com.google.cloud.Timestamp;
import lombok.Data;

@Data
public class User {
    private String uid; // PK (from Firebase Auth)
    private String username; // Unique username
    private String fullName;
    private String email; // Unique
    private Boolean emailVerified;
    private String password; // Encrypted (BCrypt) - optional if using only Firebase Auth
    private String phone;
    private String role; // CITIZEN, POLICE, ADMIN
    private String address;
    private String languagePreference;
    private String status; // ACTIVE, LOCKED
    private Timestamp lastLoginAt;

    // Password reset functionality
    private String passwordResetToken;
    private Timestamp resetTokenExpiresAt;

    // Soft delete
    private Timestamp deletedAt;

    // Auditing
    private Timestamp createdAt;
    private Timestamp updatedAt;
}
