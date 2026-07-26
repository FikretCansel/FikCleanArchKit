package com.monas.backend.auth.core.domain;

import java.util.Objects;

public record User(Username username, String displayName, PasswordHash passwordHash) {

    public User {
        username = Objects.requireNonNull(username, "username must not be null");
        displayName = Objects.requireNonNull(displayName, "displayName must not be null").trim();
        passwordHash = Objects.requireNonNull(passwordHash, "passwordHash must not be null");
        if (displayName.isBlank()) {
            throw new IllegalArgumentException("Display name bos olamaz.");
        }
    }
}
