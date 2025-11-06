package com.crimenet.service;

import com.crimenet.repository.ReportRepository;
import com.crimenet.repository.UserRepository;
import com.crimenet.repository.TipRepository;
import com.crimenet.repository.SOSRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class AnalyticsService {

    private final ReportRepository reportRepository;
    private final UserRepository userRepository;
    private final TipRepository tipRepository;
    private final SOSRepository sosRepository;

    public AnalyticsService(ReportRepository reportRepository, UserRepository userRepository,
            TipRepository tipRepository, SOSRepository sosRepository) {
        this.reportRepository = reportRepository;
        this.userRepository = userRepository;
        this.tipRepository = tipRepository;
        this.sosRepository = sosRepository;
    }

    public Map<String, Object> getStatistics() throws ExecutionException, InterruptedException {
        Map<String, Object> stats = new HashMap<>();

        // Get counts by status
        stats.put("pendingReports", reportRepository.findByStatus("PENDING").size());
        stats.put("underInvestigationReports", reportRepository.findByStatus("UNDER_INVESTIGATION").size());
        stats.put("closedReports", reportRepository.findByStatus("CLOSED").size());

        // Get user counts by role
        long citizenCount = userRepository.findByRole("CITIZEN").size();
        long policeCount = userRepository.findByRole("POLICE").size();
        long adminCount = userRepository.findByRole("ADMIN").size();
        
        stats.put("citizenCount", citizenCount);
        stats.put("policeCount", policeCount);
        stats.put("adminCount", adminCount);
        stats.put("totalUsers", citizenCount + policeCount + adminCount);
        stats.put("totalReports", reportRepository.findAll().size());
        stats.put("resolvedReports", reportRepository.findByStatus("RESOLVED").size());
        stats.put("pendingReports", reportRepository.findByStatus("PENDING").size());

        // Get tips count
        stats.put("totalTips", tipRepository.findAll().size());

        // Additional statistics
        stats.put("activeSOSAlerts", sosRepository.findByStatus("ACTIVE").size());

        return stats;
    }

    public Map<String, Integer> getReportsByCategory() throws ExecutionException, InterruptedException {
        Map<String, Integer> categoryStats = new HashMap<>();

        // This is a simplified implementation
        // In production, you'd want to add a query method to filter by category
        categoryStats.put("THEFT", 0);
        categoryStats.put("ASSAULT", 0);
        categoryStats.put("VANDALISM", 0);
        categoryStats.put("CYBER_CRIME", 0);
        categoryStats.put("MISSING_PERSON", 0);
        categoryStats.put("OTHER", 0);

        return categoryStats;
    }

    public Map<String, Object> getReportTrends() {
        Map<String, Object> trends = new HashMap<>();

        // Placeholder for trend analysis
        // In production, implement time-series analysis of reports
        trends.put("daily", new HashMap<>());
        trends.put("weekly", new HashMap<>());
        trends.put("monthly", new HashMap<>());

        return trends;
    }

    public Map<String, Object> getCrimeStats(int days) throws ExecutionException, InterruptedException {
        Map<String, Object> stats = new HashMap<>();

        java.util.List<com.crimenet.model.CrimeReport> allReports = reportRepository.findAll();

        // Filter reports within the time range
        long cutoffTime = System.currentTimeMillis() - (days * 24L * 60L * 60L * 1000L);
        java.util.List<com.crimenet.model.CrimeReport> filteredReports = allReports.stream()
                .filter(r -> r.getCreatedAt() != null && r.getCreatedAt().toDate().getTime() >= cutoffTime)
                .collect(java.util.stream.Collectors.toList());

        stats.put("totalReports", filteredReports.size());
        stats.put("pendingReports", filteredReports.stream().filter(r -> "PENDING".equals(r.getStatus())).count());
        stats.put("inProgressReports", filteredReports.stream()
                .filter(r -> "IN_PROGRESS".equals(r.getStatus()) || "INVESTIGATING".equals(r.getStatus())).count());
        stats.put("resolvedReports", filteredReports.stream()
                .filter(r -> "RESOLVED".equals(r.getStatus()) || "CLOSED".equals(r.getStatus())).count());

        return stats;
    }

    public java.util.List<Map<String, Object>> getCrimesByCategory(int days)
            throws ExecutionException, InterruptedException {
        java.util.List<com.crimenet.model.CrimeReport> allReports = reportRepository.findAll();

        long cutoffTime = System.currentTimeMillis() - (days * 24L * 60L * 60L * 1000L);
        java.util.Map<String, Long> categoryCounts = allReports.stream()
                .filter(r -> r.getCreatedAt() != null && r.getCreatedAt().toDate().getTime() >= cutoffTime)
                .collect(java.util.stream.Collectors.groupingBy(
                        r -> r.getCategory() != null ? r.getCategory() : "UNKNOWN",
                        java.util.stream.Collectors.counting()));

        return categoryCounts.entrySet().stream()
                .map(entry -> {
                    Map<String, Object> item = new HashMap<>();
                    item.put("category", entry.getKey());
                    item.put("count", entry.getValue());

                    // Calculate status breakdown
                    java.util.List<com.crimenet.model.CrimeReport> categoryReports = allReports.stream()
                            .filter(r -> entry.getKey().equals(r.getCategory()))
                            .filter(r -> r.getCreatedAt() != null && r.getCreatedAt().toDate().getTime() >= cutoffTime)
                            .collect(java.util.stream.Collectors.toList());

                    item.put("pending", categoryReports.stream().filter(r -> "PENDING".equals(r.getStatus())).count());
                    item.put("inProgress",
                            categoryReports.stream().filter(
                                    r -> "IN_PROGRESS".equals(r.getStatus()) || "INVESTIGATING".equals(r.getStatus()))
                                    .count());
                    item.put("resolved", categoryReports.stream()
                            .filter(r -> "RESOLVED".equals(r.getStatus()) || "CLOSED".equals(r.getStatus())).count());

                    return item;
                })
                .collect(java.util.stream.Collectors.toList());
    }

    public java.util.List<Map<String, Object>> getCrimesByStatus(int days)
            throws ExecutionException, InterruptedException {
        java.util.List<com.crimenet.model.CrimeReport> allReports = reportRepository.findAll();

        long cutoffTime = System.currentTimeMillis() - (days * 24L * 60L * 60L * 1000L);
        java.util.Map<String, Long> statusCounts = allReports.stream()
                .filter(r -> r.getCreatedAt() != null && r.getCreatedAt().toDate().getTime() >= cutoffTime)
                .collect(java.util.stream.Collectors.groupingBy(
                        r -> r.getStatus() != null ? r.getStatus() : "UNKNOWN",
                        java.util.stream.Collectors.counting()));

        return statusCounts.entrySet().stream()
                .map(entry -> {
                    Map<String, Object> item = new HashMap<>();
                    item.put("name", entry.getKey());
                    item.put("value", entry.getValue());
                    return item;
                })
                .collect(java.util.stream.Collectors.toList());
    }

    public java.util.List<Map<String, Object>> getCrimeTrends(int days)
            throws ExecutionException, InterruptedException {
        java.util.List<com.crimenet.model.CrimeReport> allReports = reportRepository.findAll();

        long cutoffTime = System.currentTimeMillis() - (days * 24L * 60L * 60L * 1000L);
        java.util.List<com.crimenet.model.CrimeReport> filteredReports = allReports.stream()
                .filter(r -> r.getCreatedAt() != null && r.getCreatedAt().toDate().getTime() >= cutoffTime)
                .collect(java.util.stream.Collectors.toList());

        // Group by date
        java.util.Map<String, Long> dateCounts = filteredReports.stream()
                .collect(java.util.stream.Collectors.groupingBy(
                        r -> {
                            java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("MMM dd");
                            return sdf.format(r.getCreatedAt().toDate());
                        },
                        java.util.stream.Collectors.counting()));

        return dateCounts.entrySet().stream()
                .map(entry -> {
                    Map<String, Object> item = new HashMap<>();
                    item.put("date", entry.getKey());
                    item.put("count", entry.getValue());
                    return item;
                })
                .sorted((a, b) -> ((String) a.get("date")).compareTo((String) b.get("date")))
                .collect(java.util.stream.Collectors.toList());
    }

    public Map<String, Object> getUserStats(String userId) throws ExecutionException, InterruptedException {
        Map<String, Object> stats = new HashMap<>();

        // Get user's reports
        java.util.List<com.crimenet.model.CrimeReport> userReports = reportRepository.findByUserId(userId);
        stats.put("totalReports", userReports.size());
        stats.put("activeCases", userReports.stream().filter(r -> "PENDING".equals(r.getStatus())
                || "IN_PROGRESS".equals(r.getStatus()) || "INVESTIGATING".equals(r.getStatus())).count());
        stats.put("resolvedCases", userReports.stream()
                .filter(r -> "RESOLVED".equals(r.getStatus()) || "CLOSED".equals(r.getStatus())).count());

        // Get user's tips
        java.util.List<com.crimenet.model.AnonymousTip> userTips = tipRepository.findByUserId(userId);
        stats.put("tipsSubmitted", userTips != null ? userTips.size() : 0);

        return stats;
    }
}
