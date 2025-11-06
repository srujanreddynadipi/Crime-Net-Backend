package com.crimenet.service;

import com.crimenet.exception.NotFoundException;
import com.crimenet.model.AnonymousTip;
import com.crimenet.repository.TipRepository;
import com.google.cloud.Timestamp;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

@Service
public class TipService {

    private final TipRepository tipRepository;

    public TipService(TipRepository tipRepository) {
        this.tipRepository = tipRepository;
    }

    public AnonymousTip createTip(AnonymousTip tip) throws ExecutionException, InterruptedException {
        tip.setTipId(UUID.randomUUID().toString());
        tip.setTrackingCode("TIP-" + System.currentTimeMillis());
        tip.setStatus("PENDING");
        tip.setCreatedAt(Timestamp.now());
        tip.setUpdatedAt(Timestamp.now());
        tipRepository.save(tip);
        return tip;
    }

    public AnonymousTip findByTrackingCode(String trackingCode) throws ExecutionException, InterruptedException {
        AnonymousTip tip = tipRepository.findByTrackingCode(trackingCode);
        if (tip == null) {
            throw new NotFoundException("Tip not found with tracking code: " + trackingCode);
        }
        return tip;
    }

    public List<AnonymousTip> getAllTips() throws ExecutionException, InterruptedException {
        return tipRepository.findAll();
    }
}
