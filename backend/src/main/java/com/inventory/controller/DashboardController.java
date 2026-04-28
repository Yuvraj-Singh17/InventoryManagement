package com.inventory.controller;

import com.inventory.model.Product;
import com.inventory.model.Sale;
import com.inventory.repository.ProductRepository;
import com.inventory.repository.SaleRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.TextStyle;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    private final ProductRepository productRepository;
    private final SaleRepository saleRepository;

    public DashboardController(ProductRepository productRepository, SaleRepository saleRepository) {
        this.productRepository = productRepository;
        this.saleRepository = saleRepository;
    }

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> summary() {
        Map<String, Object> response = new HashMap<>();
        
        // Basic Stats
        response.put("totalProducts", productRepository.count());
        response.put("totalStock", productRepository.findAll().stream().mapToInt(Product::getQuantity).sum());
        response.put("revenue", saleRepository.findAll().stream().mapToDouble(Sale::getTotalAmount).sum());
        response.put("lowStock", productRepository.findByQuantityLessThanEqual(10, org.springframework.data.domain.PageRequest.of(0, 10)).getContent());
        
        // Chart Data (Last 7 Days)
        LocalDateTime weekAgo = LocalDateTime.now().minusDays(7);
        List<Sale> recentSales = saleRepository.findAllBySoldAtAfter(weekAgo);
        
        List<Map<String, Object>> chartData = new ArrayList<>();
        for (int i = 6; i >= 0; i--) {
            LocalDateTime day = LocalDateTime.now().minusDays(i);
            String dayName = day.getDayOfWeek().getDisplayName(TextStyle.SHORT, Locale.ENGLISH);
            
            double dayRevenue = recentSales.stream()
                    .filter(s -> s.getSoldAt().toLocalDate().equals(day.toLocalDate()))
                    .mapToDouble(Sale::getTotalAmount)
                    .sum();
            
            Map<String, Object> dataPoint = new HashMap<>();
            dataPoint.put("name", dayName);
            dataPoint.put("revenue", dayRevenue);
            chartData.add(dataPoint);
        }
        response.put("chartData", chartData);
        
        // Recent Activity
        List<Sale> topSales = saleRepository.findTop5ByOrderBySoldAtDesc();
        List<Map<String, Object>> activity = topSales.stream().map(s -> {
            Map<String, Object> item = new HashMap<>();
            item.put("type", "SALE");
            item.put("message", "Sale: " + s.getProduct().getName() + " (" + s.getQuantity() + " units)");
            item.put("time", s.getSoldAt());
            return item;
        }).collect(Collectors.toList());
        response.put("recentActivity", activity);
        
        return ResponseEntity.ok(response);
    }
}
// completed dashboardController code
