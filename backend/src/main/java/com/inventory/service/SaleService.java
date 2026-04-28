package com.inventory.service;

import com.inventory.model.Product;
import com.inventory.model.Sale;
import com.inventory.repository.ProductRepository;
import com.inventory.repository.SaleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SaleService {
    private final SaleRepository saleRepository;
    private final ProductRepository productRepository;

    public SaleService(SaleRepository saleRepository, ProductRepository productRepository) {
        this.saleRepository = saleRepository;
        this.productRepository = productRepository;
    }

    public Sale createSale(Long productId, int quantity) {
        Product product = productRepository.findById(productId).orElseThrow();
        product.setQuantity(product.getQuantity() - quantity);
        productRepository.save(product);
        Sale sale = new Sale(product, quantity, quantity * product.getSalePrice());
        return saleRepository.save(sale);
    }

    public List<Sale> listAll() {
        return saleRepository.findAll();
    }
}
