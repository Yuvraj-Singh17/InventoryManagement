package com.inventory.controller;

import com.inventory.model.Purchase;
import com.inventory.service.PurchaseService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/purchases")
public class PurchaseController {
    private final PurchaseService purchaseService;

    public PurchaseController(PurchaseService purchaseService) {
        this.purchaseService = purchaseService;
    }

    @GetMapping
    public ResponseEntity<List<Purchase>> list() {
        return ResponseEntity.ok(purchaseService.listAll());
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ADMIN','MANAGER')")
    public ResponseEntity<Purchase> create(@RequestBody Map<String, Object> request) {
        Long productId = Long.valueOf(request.get("productId").toString());
        Long supplierId = Long.valueOf(request.get("supplierId").toString());
        int quantity = Integer.parseInt(request.get("quantity").toString());
        double cost = Double.parseDouble(request.get("cost").toString());
        return ResponseEntity.ok(purchaseService.createPurchase(productId, supplierId, quantity, cost));
    }
}
