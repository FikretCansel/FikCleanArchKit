package com.monas.backend.catalog.configuration;

import com.monas.backend.catalog.core.application.handler.GetProductDetailQueryHandler;
import com.monas.backend.catalog.core.application.handler.GetProductsQueryHandler;
import com.monas.backend.catalog.core.domain.port.ProductRepository;
import com.monas.backend.catalog.infrastructure.product.InMemoryProductRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CatalogConfiguration {

    @Bean
    public ProductRepository productRepository() {
        return new InMemoryProductRepository();
    }

    @Bean
    public GetProductsQueryHandler getProductsQueryHandler(ProductRepository productRepository) {
        return new GetProductsQueryHandler(productRepository);
    }

    @Bean
    public GetProductDetailQueryHandler getProductDetailQueryHandler(ProductRepository productRepository) {
        return new GetProductDetailQueryHandler(productRepository);
    }
}
