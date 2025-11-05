package com.crimenet.repository;

import com.crimenet.model.CrimeReport;
import com.crimenet.model.ReportTimeline;
import com.crimenet.model.Attachment;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Repository
public class ReportRepository {

    private final Firestore firestore;
    private static final String COLLECTION_NAME = "reports";

    public ReportRepository(Firestore firestore) {
        this.firestore = firestore;
    }

    public CrimeReport findById(String reportId) throws ExecutionException, InterruptedException {
        DocumentSnapshot document = firestore.collection(COLLECTION_NAME)
                .document(reportId)
                .get()
                .get();

        return document.exists() ? document.toObject(CrimeReport.class) : null;
    }

    public void save(CrimeReport report) throws ExecutionException, InterruptedException {
        firestore.collection(COLLECTION_NAME)
                .document(report.getReportId())
                .set(report)
                .get();
    }

    public List<CrimeReport> findByUserId(String userId) throws ExecutionException, InterruptedException {
        QuerySnapshot querySnapshot = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("userId", userId)
                .get()
                .get();

        // Sort in-memory by createdAt desc to avoid requiring a Firestore composite index
        return querySnapshot.getDocuments().stream()
                .map(doc -> doc.toObject(CrimeReport.class))
                .sorted((a, b) -> {
                    if (a.getCreatedAt() == null && b.getCreatedAt() == null) return 0;
                    if (a.getCreatedAt() == null) return 1;
                    if (b.getCreatedAt() == null) return -1;
                    return b.getCreatedAt().compareTo(a.getCreatedAt());
                })
                .collect(Collectors.toList());
    }

    public List<CrimeReport> findByStatus(String status) throws ExecutionException, InterruptedException {
        QuerySnapshot querySnapshot = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("status", status)
                .get()
                .get();

        return querySnapshot.getDocuments().stream()
                .map(doc -> doc.toObject(CrimeReport.class))
                .collect(Collectors.toList());
    }

    public List<CrimeReport> findByOfficerId(String officerId) throws ExecutionException, InterruptedException {
        QuerySnapshot querySnapshot = firestore.collection(COLLECTION_NAME)
                .whereEqualTo("assignedOfficerId", officerId)
                .get()
                .get();

        return querySnapshot.getDocuments().stream()
                .map(doc -> doc.toObject(CrimeReport.class))
                .collect(Collectors.toList());
    }

    public void addTimeline(String reportId, ReportTimeline timeline) throws ExecutionException, InterruptedException {
        firestore.collection(COLLECTION_NAME)
                .document(reportId)
                .collection("timelines")
                .document(timeline.getTimelineId())
                .set(timeline)
                .get();
    }

    public List<ReportTimeline> getTimelines(String reportId) throws ExecutionException, InterruptedException {
        QuerySnapshot querySnapshot = firestore.collection(COLLECTION_NAME)
                .document(reportId)
                .collection("timelines")
                .orderBy("createdAt", com.google.cloud.firestore.Query.Direction.ASCENDING)
                .get()
                .get();

        return querySnapshot.getDocuments().stream()
                .map(doc -> doc.toObject(ReportTimeline.class))
                .collect(Collectors.toList());
    }

    public void addAttachment(String reportId, Attachment attachment) throws ExecutionException, InterruptedException {
        firestore.collection(COLLECTION_NAME)
                .document(reportId)
                .collection("attachments")
                .document(attachment.getAttachmentId())
                .set(attachment)
                .get();
    }

    public List<Attachment> getAttachments(String reportId) throws ExecutionException, InterruptedException {
        QuerySnapshot querySnapshot = firestore.collection(COLLECTION_NAME)
                .document(reportId)
                .collection("attachments")
                .get()
                .get();

        return querySnapshot.getDocuments().stream()
                .map(doc -> doc.toObject(Attachment.class))
                .collect(Collectors.toList());
    }

    public void delete(String reportId) throws ExecutionException, InterruptedException {
        firestore.collection(COLLECTION_NAME)
                .document(reportId)
                .delete()
                .get();
    }

    public List<CrimeReport> findAll() throws ExecutionException, InterruptedException {
        QuerySnapshot querySnapshot = firestore.collection(COLLECTION_NAME)
                .get()
                .get();

        return querySnapshot.getDocuments().stream()
                .map(doc -> doc.toObject(CrimeReport.class))
                .collect(Collectors.toList());
    }
}
