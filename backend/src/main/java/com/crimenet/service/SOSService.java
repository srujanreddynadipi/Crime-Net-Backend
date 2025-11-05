package com.crimenet.service;

import com.crimenet.dto.UpdateSOSRequest;
import com.crimenet.exception.NotFoundException;
import com.crimenet.model.SOSAlert;
import com.crimenet.repository.SOSRepository;
import com.google.cloud.Timestamp;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.ExecutionException;

@Service
public class SOSService {

    private final SOSRepository sosRepository;

    public SOSService(SOSRepository sosRepository) {
        this.sosRepository = sosRepository;
    }

    public SOSAlert triggerSOS(SOSAlert sos) throws ExecutionException, InterruptedException {
        sos.setSosId(UUID.randomUUID().toString());
        sos.setStatus("ACTIVE");
        sos.setTriggeredAt(Timestamp.now());
        sos.setCreatedAt(Timestamp.now());
        sosRepository.save(sos);
        return sos;
    }

    public java.util.List<SOSAlert> getUserAlerts(String userId) throws ExecutionException, InterruptedException {
        return sosRepository.findByUserId(userId);
    }

    public java.util.List<SOSAlert> getActiveAlerts() throws ExecutionException, InterruptedException {
        return sosRepository.findByStatus("ACTIVE");
    }

    public SOSAlert cancelSOS(String sosId, String userId) throws ExecutionException, InterruptedException {
        SOSAlert sos = sosRepository.findById(sosId);
        if (sos == null) {
            throw new NotFoundException("SOS alert not found: " + sosId);
        }
        if (!sos.getUserId().equals(userId)) {
            throw new IllegalArgumentException("You can only cancel your own SOS alerts");
        }
        if (!"ACTIVE".equals(sos.getStatus())) {
            throw new IllegalStateException("Can only cancel active alerts");
        }
        sos.setStatus("CANCELLED");
        sos.setHandledAt(Timestamp.now());
        sosRepository.save(sos);
        return sos;
    }

    public SOSAlert updateStatus(String sosId, String status) throws ExecutionException, InterruptedException {
        SOSAlert sos = sosRepository.findById(sosId);
        if (sos == null) {
            throw new NotFoundException("SOS alert not found: " + sosId);
        }
        sos.setStatus(status);
        if ("RESOLVED".equals(status) || "RESPONDED".equals(status)) {
            sos.setHandledAt(Timestamp.now());
        }
        sosRepository.save(sos);
        return sos;
    }
}
