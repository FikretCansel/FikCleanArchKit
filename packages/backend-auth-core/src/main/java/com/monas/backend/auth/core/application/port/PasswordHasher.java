package com.monas.backend.auth.core.application.port;

import com.monas.backend.auth.core.domain.model.PasswordHash;

public interface PasswordHasher {
    PasswordHash hash(String rawPassword);

    boolean matches(String rawPassword, PasswordHash passwordHash);
}
