package com.monas.backend.auth.presentation;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.monas.backend.auth.configuration.AuthConfiguration;
import com.monas.backend.auth.core.application.service.LoginUserUseCase;
import com.monas.backend.auth.core.application.service.RegisterUserUseCase;
import com.monas.backend.auth.core.domain.port.AuthRepository;
import com.monas.backend.auth.infrastructure.JwtTokenProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Map;

import static org.hamcrest.Matchers.matchesPattern;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class AuthControllerTests {

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        AuthConfiguration configuration = new AuthConfiguration();
        var passwordEncoder = new BCryptPasswordEncoder();
        var passwordHasher = configuration.passwordHasher(passwordEncoder);
        AuthRepository authRepository = configuration.authRepository(passwordHasher);
        var tokenIssuer = new JwtTokenProvider(
                "FikCleanArchKitDemoSecretForHs256JwtAuthModule123456",
                3600
        );
        LoginUserUseCase loginUserUseCase = configuration.loginUserUseCase(
                authRepository,
                passwordHasher,
                tokenIssuer
        );
        RegisterUserUseCase registerUserUseCase = configuration.registerUserUseCase(
                authRepository,
                passwordHasher,
                tokenIssuer
        );

        mockMvc = MockMvcBuilders
                .standaloneSetup(new AuthController(loginUserUseCase, registerUserUseCase))
                .setControllerAdvice(new AuthExceptionHandler())
                .build();
        objectMapper = new ObjectMapper();
    }

    @Test
    void loginReturnsJwtForSeedUser() throws Exception {
        mockMvc.perform(post("/api/user/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of(
                                "username", "fikret",
                                "password", "fikret"
                        ))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.user.username").value("fikret"))
                .andExpect(jsonPath("$.user.displayName").value("Fikret"))
                .andExpect(jsonPath("$.token", matchesPattern("^[^.]+\\.[^.]+\\.[^.]+$")));
    }

    @Test
    void loginReturnsUnauthorizedForInvalidCredentials() throws Exception {
        mockMvc.perform(post("/api/user/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of(
                                "username", "fikret",
                                "password", "wrong"
                        ))))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.message").value("Kullanici adi veya sifre hatali."));
    }

    @Test
    void registerReturnsJwtForNewUser() throws Exception {
        String username = "user" + System.nanoTime();

        mockMvc.perform(post("/api/user/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of(
                                "username", username,
                                "password", "secret"
                        ))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.user.username").value(username))
                .andExpect(jsonPath("$.user.displayName").value(username))
                .andExpect(jsonPath("$.token", matchesPattern("^[^.]+\\.[^.]+\\.[^.]+$")));
    }

    @Test
    void registerReturnsBadRequestForInvalidInput() throws Exception {
        mockMvc.perform(post("/api/user/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of(
                                "username", "ab",
                                "password", "xy"
                        ))))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Kullanici adi ve sifre en az 3 karakter olmali."));
    }

    @Test
    void registerReturnsConflictForDuplicateUsername() throws Exception {
        String username = "dup" + System.nanoTime();
        String body = objectMapper.writeValueAsString(Map.of(
                "username", username,
                "password", "secret"
        ));

        mockMvc.perform(post("/api/user/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk());

        mockMvc.perform(post("/api/user/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.message").value("Kullanici zaten mevcut: " + username));
    }
}

