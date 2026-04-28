package com.inventory.repository;

import com.inventory.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByNameContainingIgnoreCase(String term, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.quantity <= :threshold")
    Page<Product> findByQuantityLessThanEqual(int threshold, Pageable pageable);
}
