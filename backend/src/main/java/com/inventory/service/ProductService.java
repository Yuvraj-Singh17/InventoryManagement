package com.inventory.service;

import com.inventory.dto.ProductDto;
import com.inventory.model.Category;
import com.inventory.model.Product;
import com.inventory.model.Supplier;
import com.inventory.repository.CategoryRepository;
import com.inventory.repository.ProductRepository;
import com.inventory.repository.SupplierRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final SupplierRepository supplierRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository, SupplierRepository supplierRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.supplierRepository = supplierRepository;
    }

    public Page<Product> searchProducts(String term, Pageable pageable) {
        if (term == null || term.isBlank()) {
            return productRepository.findAll(pageable);
        }
        return productRepository.findByNameContainingIgnoreCase(term, pageable);
    }

    public Product save(Product product) {
        return productRepository.save(product);
    }

    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    public void deleteById(Long id) {
        productRepository.deleteById(id);
    }

    public Page<Product> findLowStock(int threshold, Pageable pageable) {
        return productRepository.findByQuantityLessThanEqual(threshold, pageable);
    }

    public Product createFromDto(ProductDto dto) {
        Product product = new Product();
        product.setName(dto.getName());
        product.setSku(dto.getSku());
        product.setCostPrice(dto.getCostPrice());
        product.setSalePrice(dto.getSalePrice());
        product.setQuantity(dto.getQuantity());
        product.setDescription(dto.getDescription());
        if (dto.getCategoryName() != null && !dto.getCategoryName().isBlank()) {
            Category category = categoryRepository.findAll().stream()
                    .filter(it -> it.getName().equalsIgnoreCase(dto.getCategoryName()))
                    .findFirst()
                    .orElseGet(() -> categoryRepository.save(new Category(dto.getCategoryName())));
            product.setCategory(category);
        }
        if (dto.getSupplierName() != null && !dto.getSupplierName().isBlank()) {
            Supplier supplier = supplierRepository.findAll().stream()
                    .filter(it -> it.getName().equalsIgnoreCase(dto.getSupplierName()))
                    .findFirst()
                    .orElseGet(() -> supplierRepository.save(new Supplier(dto.getSupplierName(), "supplier@inventory.com", "0000000000", "Unknown")));
            product.setSupplier(supplier);
        }
        return save(product);
    }
}
