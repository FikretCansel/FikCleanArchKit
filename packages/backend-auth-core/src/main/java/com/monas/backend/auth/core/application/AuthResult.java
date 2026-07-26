package com.monas.backend.auth.core.application;

import com.monas.backend.auth.core.domain.AuthToken;
import com.monas.backend.auth.core.domain.User;

import java.util.Objects;

public record AuthResult(User user, AuthToken token) {

    public AuthResult {
        user = Objects.requireNonNull(user, "user must not be null");
        token = Objects.requireNonNull(token, "token must not be null");
    }
}
