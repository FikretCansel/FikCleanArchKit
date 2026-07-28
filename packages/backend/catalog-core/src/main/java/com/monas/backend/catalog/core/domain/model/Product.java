package com.monas.backend.catalog.core.domain.model;

import java.math.BigDecimal;
import java.util.Objects;

public record Product(
        Long id,
        String name,
        String description,
        BigDecimal price,
        boolean active
) {
    public Product {
        Objects.requireNonNull(id, "id is required");
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Product name is required.");
        }
        if (description == null || description.isBlank()) {
            throw new IllegalArgumentException("Product description is required.");
        }
        Objects.requireNonNull(price, "price is required");
        if (price.signum() < 0) {
            throw new IllegalArgumentException("Product price cannot be negative.");
        }
    }
}
