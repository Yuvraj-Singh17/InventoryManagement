package com.inventory.service;

import com.inventory.model.Product;
import com.inventory.model.Purchase;
import com.inventory.model.Supplier;
import com.inventory.repository.ProductRepository;
import com.inventory.repository.PurchaseRepository;
import com.inventory.repository.SupplierRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PurchaseService {
    private final PurchaseRepository purchaseRepository;
    private final ProductRepository productRepository;
    private final SupplierRepository supplierRepository;

    public PurchaseService(PurchaseRepository purchaseRepository, ProductRepository productRepository, SupplierRepository supplierRepository) {
        this.purchaseRepository = purchaseRepository;
        this.productRepository = productRepository;
        this.supplierRepository = supplierRepository;
    }

    public Purchase createPurchase(Long productId, Long supplierId, int quantity, double cost) {
        Product product = productRepository.findById(productId).orElseThrow();
        Supplier supplier = supplierRepository.findById(supplierId).orElseThrow();
        product.setQuantity(product.getQuantity() + quantity);
        productRepository.save(product);
        Purchase purchase = new Purchase(product, supplier, quantity, cost);
        return purchaseRepository.save(purchase);
    }

    public List<Purchase> listAll() {
        return purchaseRepository.findAll();
    }
}
