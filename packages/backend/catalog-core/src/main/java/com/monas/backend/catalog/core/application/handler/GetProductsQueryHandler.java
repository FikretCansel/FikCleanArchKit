package com.monas.backend.catalog.core.application.handler;

import com.monas.backend.catalog.core.application.query.GetProductsQuery;
import com.monas.backend.catalog.core.domain.model.Product;
import com.monas.backend.catalog.core.domain.port.ProductRepository;
import java.util.List;
import java.util.Objects;

public class GetProductsQueryHandler {
    private final ProductRepository productRepository;

    public GetProductsQueryHandler(ProductRepository productRepository) {
        this.productRepository = Objects.requireNonNull(productRepository, "productRepository is required");
    }

    public List<Product> handle(GetProductsQuery query) {
        Objects.requireNonNull(query, "query is required");
        return productRepository.findAllActive();
    }
}
