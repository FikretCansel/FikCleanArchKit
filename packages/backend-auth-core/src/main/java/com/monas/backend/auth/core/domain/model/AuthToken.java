package com.monas.backend.auth.core.domain.model;

import java.time.Instant;
import java.util.Objects;

public record AuthToken(String value, Instant expiresAt) {

    public AuthToken {
        value = Objects.requireNonNull(value, "token must not be null");
        expiresAt = Objects.requireNonNull(expiresAt, "expiresAt must not be null");
        if (value.isBlank()) {
            throw new IllegalArgumentException("Token bos olamaz.");
        }
    }
}
