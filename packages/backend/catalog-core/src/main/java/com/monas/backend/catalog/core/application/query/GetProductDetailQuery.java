package com.monas.backend.catalog.core.application.query;

import java.util.Objects;

public record GetProductDetailQuery(Long id) {
    public GetProductDetailQuery {
        Objects.requireNonNull(id, "id is required");
        if (id <= 0) {
            throw new IllegalArgumentException("Product id must be positive.");
        }
    }
}
