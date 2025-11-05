package com.crimenet.controller;

import com.crimenet.dto.RegisterRequest;
import com.crimenet.model.User;
import com.crimenet.service.AuthService;
import com.crimenet.service.UserService;
import com.google.firebase.auth.FirebaseToken;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final UserService userService;

    public AuthController(AuthService authService, UserService userService) {
        this.authService = authService;
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        try {
            User user = new User();
            user.setUid(request.getUid());
            user.setFullName(request.getFullName());
            user.setEmail(request.getEmail());
            user.setPhone(request.getPhone());
            user.setAddress(request.getAddress());
            user.setRole("CITIZEN");

            userService.createUser(user);
            authService.setUserRole(request.getUid(), "CITIZEN");

            return ResponseEntity.ok(Map.of("message", "User registered successfully"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestHeader("Authorization") String token) {
        try {
            String idToken = token.replace("Bearer ", "");
            FirebaseToken decodedToken = authService.verifyToken(idToken);
            
            // Get user role from database
            User user = userService.getUserById(decodedToken.getUid());
            String role = user != null ? user.getRole() : "CITIZEN";
            
            return ResponseEntity.ok(Map.of(
                    "uid", decodedToken.getUid(),
                    "email", decodedToken.getEmail(),
                    "role", role));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid token"));
        }
    }
}
