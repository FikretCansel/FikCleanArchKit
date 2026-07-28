package com.monas.backend.auth.core.application.result;

import com.monas.backend.auth.core.domain.model.AuthToken;
import com.monas.backend.auth.core.domain.model.User;

import java.util.Objects;

public record AuthResult(User user, AuthToken token) {

    public AuthResult {
        user = Objects.requireNonNull(user, "user must not be null");
        token = Objects.requireNonNull(token, "token must not be null");
    }
}
