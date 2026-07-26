package com.monas.backend.auth.core.application;

import com.monas.backend.auth.core.domain.PasswordHash;

public interface PasswordHasher {
    PasswordHash hash(String rawPassword);

    boolean matches(String rawPassword, PasswordHash passwordHash);
}
