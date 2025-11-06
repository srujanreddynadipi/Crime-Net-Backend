package com.crimenet.service;

import com.crimenet.exception.NotFoundException;
import com.crimenet.model.CrimeReport;
import com.crimenet.model.ReportTimeline;
import com.crimenet.repository.ReportRepository;
import com.google.cloud.Timestamp;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

@Service
public class ReportService {

    private final ReportRepository reportRepository;

    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    public CrimeReport createReport(CrimeReport report) throws ExecutionException, InterruptedException {
        report.setReportId(UUID.randomUUID().toString());
        report.setCaseNumber("CASE-" + System.currentTimeMillis());
        report.setStatus("PENDING");
        report.setCreatedAt(Timestamp.now());
        report.setUpdatedAt(Timestamp.now());
        reportRepository.save(report);
        return report;
    }

    public CrimeReport getReportById(String reportId) throws ExecutionException, InterruptedException {
        CrimeReport report = reportRepository.findById(reportId);
        if (report == null) {
            throw new NotFoundException("Report not found with id: " + reportId);
        }
        return report;
    }

    public List<CrimeReport> getReportsByUser(String userId) throws ExecutionException, InterruptedException {
        return reportRepository.findByUserId(userId);
    }

    public List<CrimeReport> getReportsByStatus(String status) throws ExecutionException, InterruptedException {
        return reportRepository.findByStatus(status);
    }

    public List<CrimeReport> getAllReports() throws ExecutionException, InterruptedException {
        return reportRepository.findAll();
    }

    public CrimeReport assignOfficer(String reportId, String officerId, String actorUid)
            throws ExecutionException, InterruptedException {
        CrimeReport report = getReportById(reportId);

        String oldStatus = report.getStatus();
        report.setAssignedOfficerId(officerId);
        report.setUpdatedAt(Timestamp.now());
        reportRepository.save(report);

        // Add timeline entry
        ReportTimeline timeline = new ReportTimeline();
        timeline.setTimelineId(UUID.randomUUID().toString());
        timeline.setStatusFrom(oldStatus);
        timeline.setStatusTo(oldStatus);
        timeline.setNote("Officer assigned: " + officerId);
        timeline.setActorUserId(actorUid);
        timeline.setCreatedAt(Timestamp.now());
        reportRepository.addTimeline(reportId, timeline);

        return report;
    }

    public CrimeReport updateStatus(String reportId, String newStatus, String note, String actorUid)
            throws ExecutionException, InterruptedException {
        CrimeReport report = getReportById(reportId);

        String oldStatus = report.getStatus();
        report.setStatus(newStatus);
        report.setUpdatedAt(Timestamp.now());
        reportRepository.save(report);

        // Add timeline entry
        ReportTimeline timeline = new ReportTimeline();
        timeline.setTimelineId(UUID.randomUUID().toString());
        timeline.setStatusFrom(oldStatus);
        timeline.setStatusTo(newStatus);
        timeline.setNote(note);
        timeline.setActorUserId(actorUid);
        timeline.setCreatedAt(Timestamp.now());
        reportRepository.addTimeline(reportId, timeline);

        return report;
    }

    public List<ReportTimeline> getTimeline(String reportId) throws ExecutionException, InterruptedException {
        return reportRepository.getTimelines(reportId);
    }
}
