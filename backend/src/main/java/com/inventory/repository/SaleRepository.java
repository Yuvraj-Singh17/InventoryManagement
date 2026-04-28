package com.inventory.repository;

import com.inventory.model.Sale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
// CODE REPOSITORY
@Repository
public interface SaleRepository extends JpaRepository<Sale, Long> {
    List<Sale> findAllBySoldAtAfter(LocalDateTime date);
    List<Sale> findTop5ByOrderBySoldAtDesc();
}
