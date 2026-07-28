package com.monas.backend.catalog.core.domain.port;

import com.monas.backend.catalog.core.domain.model.Product;
import java.util.List;
import java.util.Optional;

public interface ProductRepository {
    List<Product> findAllActive();

    Optional<Product> findActiveById(Long id);
}
