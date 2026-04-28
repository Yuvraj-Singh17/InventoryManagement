package com.inventory.controller;

import com.inventory.dto.ProductDto;
import com.inventory.model.Product;
import com.inventory.service.ProductService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<Page<Product>> list(@RequestParam(defaultValue = "0") int page,
                                              @RequestParam(defaultValue = "12") int size,
                                              @RequestParam(required = false) String search) {
        return ResponseEntity.ok(productService.searchProducts(search, PageRequest.of(page, size)));
    }

    @GetMapping("/low-stock")
    public ResponseEntity<Page<Product>> lowStock(@RequestParam(defaultValue = "10") int threshold,
                                                  @RequestParam(defaultValue = "0") int page,
                                                  @RequestParam(defaultValue = "12") int size) {
        return ResponseEntity.ok(productService.findLowStock(threshold, PageRequest.of(page, size)));
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('ADMIN','MANAGER')")
    public ResponseEntity<Product> create(@RequestBody ProductDto request) {
        return ResponseEntity.ok(productService.createFromDto(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('ADMIN','MANAGER')")
    public ResponseEntity<Product> update(@PathVariable Long id, @RequestBody ProductDto request) {
        Product product = productService.findById(id).orElseThrow();
        product.setName(request.getName());
        product.setSku(request.getSku());
        product.setCostPrice(request.getCostPrice());
        product.setSalePrice(request.getSalePrice());
        product.setQuantity(request.getQuantity());
        product.setDescription(request.getDescription());
        return ResponseEntity.ok(productService.save(product));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Map<String, String>> delete(@PathVariable Long id) {
        productService.deleteById(id);
        return ResponseEntity.ok(Map.of("message", "Product deleted"));
    }
}
