package com.crimenet.controller;

import com.crimenet.model.User;
import com.crimenet.security.FirebaseUserDetails;
import com.crimenet.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{uid}")
    @PreAuthorize("hasAnyRole('CITIZEN', 'POLICE', 'ADMIN')")
    public ResponseEntity<User> getUser(@PathVariable String uid, Authentication auth) {
        try {
            FirebaseUserDetails userDetails = (FirebaseUserDetails) auth.getPrincipal();
            // Users can only view their own profile unless they're admin
            if (!userDetails.getUid().equals(uid) && !userDetails.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
                return ResponseEntity.status(403).build();
            }
            User user = userService.getUserById(uid);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{uid}")
    @PreAuthorize("hasAnyRole('CITIZEN', 'POLICE', 'ADMIN')")
    public ResponseEntity<User> updateUser(@PathVariable String uid, @RequestBody User user, Authentication auth) {
        try {
            FirebaseUserDetails userDetails = (FirebaseUserDetails) auth.getPrincipal();
            // Users can only update their own profile unless they're admin
            if (!userDetails.getUid().equals(uid) && !userDetails.getAuthorities().stream()
                    .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
                return ResponseEntity.status(403).build();
            }
            userService.updateUser(uid, user);
            User updated = userService.getUserById(uid);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{uid}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable String uid) {
        try {
            userService.deleteUser(uid);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/role/{role}")
    @PreAuthorize("hasAnyRole('POLICE', 'ADMIN')")
    public ResponseEntity<List<User>> getUsersByRole(@PathVariable String role) {
        try {
            List<User> users = userService.getUsersByRole(role);
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PatchMapping("/{uid}/role")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateUserRole(@PathVariable String uid, @RequestBody java.util.Map<String, String> body) {
        try {
            String newRole = body.get("role");
            if (newRole == null
                    || (!newRole.equals("CITIZEN") && !newRole.equals("POLICE") && !newRole.equals("ADMIN"))) {
                return ResponseEntity.badRequest()
                        .body(java.util.Map.of("error", "Invalid role. Must be CITIZEN, POLICE, or ADMIN"));
            }
            User user = userService.getUserById(uid);
            if (user == null) {
                return ResponseEntity.notFound().build();
            }
            user.setRole(newRole);
            userService.updateUser(uid, user);
            return ResponseEntity.ok(java.util.Map.of("message", "Role updated successfully", "role", newRole));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(java.util.Map.of("error", e.getMessage()));
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            if (user.getUid() == null || user.getUid().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(java.util.Map.of("error", "User ID (uid) is required"));
            }
            if (user.getEmail() == null || user.getEmail().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(java.util.Map.of("error", "Email is required"));
            }
            if (user.getFullName() == null || user.getFullName().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(java.util.Map.of("error", "Full name is required"));
            }

            // Check if user already exists
            try {
                User existingUser = userService.getUserById(user.getUid());
                if (existingUser != null) {
                    return ResponseEntity.badRequest()
                            .body(java.util.Map.of("error", "User with this ID already exists"));
                }
            } catch (Exception ignored) {
                // User doesn't exist, continue with creation
            }

            // Set default role if not provided
            if (user.getRole() == null || user.getRole().isEmpty()) {
                user.setRole("CITIZEN");
            }

            // Validate role
            if (!user.getRole().equals("CITIZEN") && !user.getRole().equals("POLICE")
                    && !user.getRole().equals("ADMIN")) {
                return ResponseEntity.badRequest()
                        .body(java.util.Map.of("error", "Invalid role. Must be CITIZEN, POLICE, or ADMIN"));
            }

            userService.createUser(user);
            User createdUser = userService.getUserById(user.getUid());
            return ResponseEntity.status(201).body(createdUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(java.util.Map.of("error", "Failed to create user: " + e.getMessage()));
        }
    }
}
