package com.monas.backend.catalog.infrastructure.product;

import com.monas.backend.catalog.core.domain.model.Product;
import com.monas.backend.catalog.core.domain.port.ProductRepository;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public class InMemoryProductRepository implements ProductRepository {
    private final List<Product> products = List.of(
            new Product(1L, "Clean Architecture Kit", "Reusable architecture starter package.", new BigDecimal("49.90"), true),
            new Product(2L, "CQRS Guide", "Practical command/query separation reference.", new BigDecimal("19.90"), true),
            new Product(3L, "Legacy Catalog", "Inactive sample product.", new BigDecimal("9.90"), false)
    );

    @Override
    public List<Product> findAllActive() {
        return products.stream()
                .filter(Product::active)
                .toList();
    }

    @Override
    public Optional<Product> findActiveById(Long id) {
        return products.stream()
                .filter(Product::active)
                .filter(product -> product.id().equals(id))
                .findFirst();
    }
}
