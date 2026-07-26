package com.monas.backend.auth.core.domain;

import java.util.Objects;

public record PasswordHash(String value) {

    public PasswordHash {
        value = Objects.requireNonNull(value, "password hash must not be null");
        if (value.isBlank()) {
            throw new IllegalArgumentException("Password hash bos olamaz.");
        }
    }
}
