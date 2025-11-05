package com.crimenet.controller;

import com.crimenet.model.AnonymousTip;
import com.crimenet.service.TipService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tips")
public class TipController {

    private final TipService tipService;

    public TipController(TipService tipService) {
        this.tipService = tipService;
    }

    @PostMapping
    public ResponseEntity<AnonymousTip> createTip(@RequestBody AnonymousTip tip) {
        try {
            AnonymousTip created = tipService.createTip(tip);
            return ResponseEntity.ok(created);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/track/{trackingCode}")
    public ResponseEntity<AnonymousTip> getTipByTrackingCode(@PathVariable String trackingCode) {
        try {
            AnonymousTip tip = tipService.findByTrackingCode(trackingCode);
            return ResponseEntity.ok(tip);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('POLICE', 'ADMIN')")
    public ResponseEntity<List<AnonymousTip>> getAllTips() {
        try {
            List<AnonymousTip> tips = tipService.getAllTips();
            return ResponseEntity.ok(tips);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
