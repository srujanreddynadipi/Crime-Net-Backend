package com.crimenet.controller;

import com.crimenet.dto.UpdateSOSRequest;
import com.crimenet.model.SOSAlert;
import com.crimenet.security.FirebaseUserDetails;
import com.crimenet.service.SOSService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sos")
public class SOSController {

    private final SOSService sosService;

    public SOSController(SOSService sosService) {
        this.sosService = sosService;
    }

    @PostMapping("/trigger")
    @PreAuthorize("hasAnyRole('CITIZEN', 'POLICE', 'ADMIN')")
    public ResponseEntity<SOSAlert> triggerSOS(@RequestBody SOSAlert sos, Authentication auth) {
        try {
            FirebaseUserDetails userDetails = (FirebaseUserDetails) auth.getPrincipal();
            sos.setUserId(userDetails.getUid());
            SOSAlert triggered = sosService.triggerSOS(sos);
            return ResponseEntity.ok(triggered);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/my-alerts")
    @PreAuthorize("hasAnyRole('CITIZEN', 'POLICE', 'ADMIN')")
    public ResponseEntity<?> getMyAlerts(Authentication auth) {
        try {
            FirebaseUserDetails userDetails = (FirebaseUserDetails) auth.getPrincipal();
            return ResponseEntity.ok(sosService.getUserAlerts(userDetails.getUid()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/active")
    @PreAuthorize("hasAnyRole('POLICE', 'ADMIN')")
    public ResponseEntity<?> getAllActiveAlerts() {
        try {
            return ResponseEntity.ok(sosService.getActiveAlerts());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{sosId}/cancel")
    @PreAuthorize("hasAnyRole('CITIZEN', 'POLICE', 'ADMIN')")
    public ResponseEntity<SOSAlert> cancelSOS(@PathVariable String sosId, Authentication auth) {
        try {
            FirebaseUserDetails userDetails = (FirebaseUserDetails) auth.getPrincipal();
            SOSAlert cancelled = sosService.cancelSOS(sosId, userDetails.getUid());
            return ResponseEntity.ok(cancelled);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{sosId}/status")
    @PreAuthorize("hasAnyRole('POLICE', 'ADMIN')")
    public ResponseEntity<SOSAlert> updateStatus(
            @PathVariable String sosId,
            @Valid @RequestBody UpdateSOSRequest request) {
        try {
            SOSAlert updated = sosService.updateStatus(sosId, request.getStatus());
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
