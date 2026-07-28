package com.monas.backend.catalog.presentation.product;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.monas.backend.catalog.configuration.CatalogConfiguration;
import com.monas.backend.catalog.core.application.handler.GetProductDetailQueryHandler;
import com.monas.backend.catalog.core.application.handler.GetProductsQueryHandler;
import com.monas.backend.catalog.core.domain.port.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

class ProductControllerTests {

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        CatalogConfiguration configuration = new CatalogConfiguration();
        ProductRepository productRepository = configuration.productRepository();
        GetProductsQueryHandler getProductsQueryHandler = configuration.getProductsQueryHandler(productRepository);
        GetProductDetailQueryHandler getProductDetailQueryHandler = configuration.getProductDetailQueryHandler(productRepository);

        mockMvc = MockMvcBuilders
                .standaloneSetup(new ProductController(getProductsQueryHandler, getProductDetailQueryHandler))
                .build();
    }

    @Test
    void getProductsReturnsActiveProducts() throws Exception {
        mockMvc.perform(get("/api/products"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].name").value("Clean Architecture Kit"));
    }

    @Test
    void getProductDetailReturnsProductWhenFound() throws Exception {
        mockMvc.perform(get("/api/products/2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(2))
                .andExpect(jsonPath("$.name").value("CQRS Guide"));
    }

    @Test
    void getProductDetailReturnsNotFoundWhenMissing() throws Exception {
        mockMvc.perform(get("/api/products/999"))
                .andExpect(status().isNotFound());
    }
}
