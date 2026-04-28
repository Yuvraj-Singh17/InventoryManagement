package com.inventory.controller;

import com.inventory.model.Sale;
import com.inventory.service.SaleService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/sales")
public class SaleController {
    private final SaleService saleService;

    public SaleController(SaleService saleService) {
        this.saleService = saleService;
    }

    @GetMapping
    public ResponseEntity<Page<Sale>> list(@RequestParam(defaultValue = "0") int page,
                                           @RequestParam(defaultValue = "10") int size) {
        // Simple mock pagination since service might only have listAll
        List<Sale> all = saleService.listAll();
        return ResponseEntity.ok(new org.springframework.data.domain.PageImpl<>(all, PageRequest.of(page, size), all.size()));
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ADMIN','MANAGER','STAFF')")
    public ResponseEntity<Sale> create(@RequestBody Map<String, Object> request) {
        Long productId = Long.valueOf(request.get("productId").toString());
        int quantity = Integer.parseInt(request.get("quantity").toString());
        return ResponseEntity.ok(saleService.createSale(productId, quantity));
    }
}
