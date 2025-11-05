package com.crimenet.controller;

import com.crimenet.dto.AssignOfficerRequest;
import com.crimenet.dto.CreateReportRequest;
import com.crimenet.dto.UpdateStatusRequest;
import com.crimenet.model.CrimeReport;
import com.crimenet.model.ReportTimeline;
import com.crimenet.security.FirebaseUserDetails;
import com.crimenet.service.ReportService;
import com.google.cloud.Timestamp;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;
    private static final Logger logger = LoggerFactory.getLogger(ReportController.class);

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('CITIZEN', 'POLICE', 'ADMIN')")
    public ResponseEntity<CrimeReport> createReport(@Valid @RequestBody CreateReportRequest request, Authentication auth) {
        try {
            FirebaseUserDetails userDetails = (FirebaseUserDetails) auth.getPrincipal();
            
            // Convert DTO to CrimeReport entity
            CrimeReport report = new CrimeReport();
            report.setUserId(userDetails.getUid());
            report.setTitle(request.getTitle());
            report.setDescription(request.getDescription());
            report.setCategory(request.getCategory());
            report.setPriority(request.getPriority());
            report.setLocation(request.getLocation());
            report.setLatitude(request.getLatitude());
            report.setLongitude(request.getLongitude());
            report.setIsAnonymous(request.getIsAnonymous() != null ? request.getIsAnonymous() : false);
            
            // Convert ISO 8601 string to Firestore Timestamp
            if (request.getIncidentAt() != null && !request.getIncidentAt().isEmpty()) {
                try {
                    Instant instant = Instant.parse(request.getIncidentAt());
                    report.setIncidentAt(Timestamp.ofTimeSecondsAndNanos(instant.getEpochSecond(), instant.getNano()));
                } catch (Exception e) {
                    logger.warn("Failed to parse incidentAt date: {}", request.getIncidentAt());
                }
            }
            
            CrimeReport created = reportService.createReport(report);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            logger.error("Error creating report: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{reportId}")
    @PreAuthorize("hasAnyRole('CITIZEN', 'POLICE', 'ADMIN')")
    public ResponseEntity<CrimeReport> getReport(@PathVariable String reportId) {
        try {
            CrimeReport report = reportService.getReportById(reportId);
            return ResponseEntity.ok(report);
        } catch (Exception e) {
            logger.error("Error fetching report {}: {}", reportId, e.getMessage(), e);
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/user/{userId}")
    @PreAuthorize("hasAnyRole('CITIZEN', 'POLICE', 'ADMIN')")
    public ResponseEntity<List<CrimeReport>> getUserReports(@PathVariable String userId) {
        try {
            List<CrimeReport> reports = reportService.getReportsByUser(userId);
            return ResponseEntity.ok(reports);
        } catch (Exception e) {
            logger.error("Error fetching reports for user {}: {}", userId, e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/status/{status}")
    @PreAuthorize("hasAnyRole('POLICE', 'ADMIN')")
    public ResponseEntity<List<CrimeReport>> getReportsByStatus(@PathVariable String status) {
        try {
            List<CrimeReport> reports = reportService.getReportsByStatus(status);
            return ResponseEntity.ok(reports);
        } catch (Exception e) {
            logger.error("Error fetching reports by status {}: {}", status, e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{reportId}/assign")
    @PreAuthorize("hasAnyRole('POLICE', 'ADMIN')")
    public ResponseEntity<CrimeReport> assignOfficer(
            @PathVariable String reportId,
            @Valid @RequestBody AssignOfficerRequest request,
            Authentication auth) {
        try {
            FirebaseUserDetails userDetails = (FirebaseUserDetails) auth.getPrincipal();
            CrimeReport updated = reportService.assignOfficer(reportId, request.getOfficerId(), userDetails.getUid());
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            logger.error("Error assigning officer to report {}: {}", reportId, e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{reportId}/status")
    @PreAuthorize("hasAnyRole('POLICE', 'ADMIN')")
    public ResponseEntity<CrimeReport> updateStatus(
            @PathVariable String reportId,
            @Valid @RequestBody UpdateStatusRequest request,
            Authentication auth) {
        try {
            FirebaseUserDetails userDetails = (FirebaseUserDetails) auth.getPrincipal();
            CrimeReport updated = reportService.updateStatus(reportId, request.getStatus(), request.getNote(),
                    userDetails.getUid());
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            logger.error("Error updating status for report {}: {}", reportId, e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{reportId}/timeline")
    @PreAuthorize("hasAnyRole('CITIZEN', 'POLICE', 'ADMIN')")
    public ResponseEntity<List<ReportTimeline>> getTimeline(@PathVariable String reportId) {
        try {
            List<ReportTimeline> timeline = reportService.getTimeline(reportId);
            return ResponseEntity.ok(timeline);
        } catch (Exception e) {
            logger.error("Error fetching timeline for report {}: {}", reportId, e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('POLICE', 'ADMIN')")
    public ResponseEntity<List<CrimeReport>> getAllReports() {
        try {
            List<CrimeReport> reports = reportService.getAllReports();
            return ResponseEntity.ok(reports);
        } catch (Exception e) {
            logger.error("Error fetching all reports: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().build();
        }
    }
}
