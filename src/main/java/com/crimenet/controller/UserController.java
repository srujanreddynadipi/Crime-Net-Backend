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
}
