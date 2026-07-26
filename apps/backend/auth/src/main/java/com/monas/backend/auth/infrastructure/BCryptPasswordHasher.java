package com.monas.backend.auth.infrastructure;

import com.monas.backend.auth.core.application.port.PasswordHasher;
import com.monas.backend.auth.core.domain.model.PasswordHash;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Objects;

public class BCryptPasswordHasher implements PasswordHasher {

    private final PasswordEncoder passwordEncoder;

    public BCryptPasswordHasher(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = Objects.requireNonNull(passwordEncoder, "passwordEncoder must not be null");
    }

    @Override
    public PasswordHash hash(String rawPassword) {
        return new PasswordHash(passwordEncoder.encode(rawPassword));
    }

    @Override
    public boolean matches(String rawPassword, PasswordHash passwordHash) {
        return passwordEncoder.matches(rawPassword, passwordHash.value());
    }
}

