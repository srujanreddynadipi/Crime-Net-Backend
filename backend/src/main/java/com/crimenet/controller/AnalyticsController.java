package com.crimenet.controller;

import com.crimenet.service.AnalyticsService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/statistics")
    @PreAuthorize("hasAnyRole('POLICE', 'ADMIN')")
    public ResponseEntity<Map<String, Object>> getStatistics() {
        try {
            Map<String, Object> stats = analyticsService.getStatistics();
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/reports/by-category")
    @PreAuthorize("hasAnyRole('POLICE', 'ADMIN')")
    public ResponseEntity<Map<String, Integer>> getReportsByCategory() {
        try {
            Map<String, Integer> stats = analyticsService.getReportsByCategory();
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/trends")
    @PreAuthorize("hasAnyRole('POLICE', 'ADMIN')")
    public ResponseEntity<Map<String, Object>> getReportTrends() {
        try {
            Map<String, Object> trends = analyticsService.getReportTrends();
            return ResponseEntity.ok(trends);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/crime-stats")
    @PreAuthorize("hasAnyRole('CITIZEN', 'POLICE', 'ADMIN')")
    public ResponseEntity<Map<String, Object>> getCrimeStats(@RequestParam(defaultValue = "30") int days) {
        try {
            Map<String, Object> stats = analyticsService.getCrimeStats(days);
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/crimes-by-category")
    @PreAuthorize("hasAnyRole('CITIZEN', 'POLICE', 'ADMIN')")
    public ResponseEntity<?> getCrimesByCategory(@RequestParam(defaultValue = "30") int days) {
        try {
            return ResponseEntity.ok(analyticsService.getCrimesByCategory(days));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/crimes-by-status")
    @PreAuthorize("hasAnyRole('CITIZEN', 'POLICE', 'ADMIN')")
    public ResponseEntity<?> getCrimesByStatus(@RequestParam(defaultValue = "30") int days) {
        try {
            return ResponseEntity.ok(analyticsService.getCrimesByStatus(days));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/crime-trends")
    @PreAuthorize("hasAnyRole('CITIZEN', 'POLICE', 'ADMIN')")
    public ResponseEntity<?> getCrimeTrends(@RequestParam(defaultValue = "30") int days) {
        try {
            return ResponseEntity.ok(analyticsService.getCrimeTrends(days));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/user-stats")
    @PreAuthorize("hasAnyRole('CITIZEN', 'POLICE', 'ADMIN')")
    public ResponseEntity<Map<String, Object>> getUserStats(org.springframework.security.core.Authentication auth) {
        try {
            com.crimenet.security.FirebaseUserDetails userDetails = (com.crimenet.security.FirebaseUserDetails) auth
                    .getPrincipal();
            Map<String, Object> stats = analyticsService.getUserStats(userDetails.getUid());
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
