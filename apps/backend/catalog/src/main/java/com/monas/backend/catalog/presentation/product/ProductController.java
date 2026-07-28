package com.monas.backend.catalog.presentation.product;

import com.monas.backend.catalog.core.application.handler.GetProductDetailQueryHandler;
import com.monas.backend.catalog.core.application.handler.GetProductsQueryHandler;
import com.monas.backend.catalog.core.application.query.GetProductDetailQuery;
import com.monas.backend.catalog.core.application.query.GetProductsQuery;
import com.monas.backend.catalog.core.domain.model.Product;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final GetProductsQueryHandler getProductsQueryHandler;
    private final GetProductDetailQueryHandler getProductDetailQueryHandler;

    @GetMapping
    public List<ProductResponse> getProducts() {
        return getProductsQueryHandler.handle(new GetProductsQuery())
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductDetail(@PathVariable Long id) {
        return getProductDetailQueryHandler.handle(new GetProductDetailQuery(id))
                .map(this::toResponse)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    private ProductResponse toResponse(Product product) {
        return new ProductResponse(
                product.id(),
                product.name(),
                product.description(),
                product.price()
        );
    }
}
