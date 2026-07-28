package com.monas.backend.catalog.core.application.handler;

import com.monas.backend.catalog.core.application.query.GetProductDetailQuery;
import com.monas.backend.catalog.core.domain.model.Product;
import com.monas.backend.catalog.core.domain.port.ProductRepository;
import java.util.Objects;
import java.util.Optional;

public class GetProductDetailQueryHandler {
    private final ProductRepository productRepository;

    public GetProductDetailQueryHandler(ProductRepository productRepository) {
        this.productRepository = Objects.requireNonNull(productRepository, "productRepository is required");
    }

    public Optional<Product> handle(GetProductDetailQuery query) {
        Objects.requireNonNull(query, "query is required");
        return productRepository.findActiveById(query.id());
    }
}
