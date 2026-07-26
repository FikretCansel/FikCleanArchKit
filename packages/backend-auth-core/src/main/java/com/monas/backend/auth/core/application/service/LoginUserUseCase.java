package com.monas.backend.auth.core.application.service;

import com.monas.backend.auth.core.application.command.LoginUserCommand;
import com.monas.backend.auth.core.application.exception.InvalidCredentialsException;
import com.monas.backend.auth.core.application.port.AuthTokenIssuer;
import com.monas.backend.auth.core.application.port.PasswordHasher;
import com.monas.backend.auth.core.application.result.AuthResult;
import com.monas.backend.auth.core.domain.model.User;
import com.monas.backend.auth.core.domain.model.Username;
import com.monas.backend.auth.core.domain.port.AuthRepository;

import java.util.Objects;

public class LoginUserUseCase {

    private final AuthRepository authRepository;
    private final PasswordHasher passwordHasher;
    private final AuthTokenIssuer tokenIssuer;

    public LoginUserUseCase(
            AuthRepository authRepository,
            PasswordHasher passwordHasher,
            AuthTokenIssuer tokenIssuer
    ) {
        // Note: Dependency inversion ile use-case framework'ten bagimsiz pure Java olarak kalir.
        this.authRepository = Objects.requireNonNull(authRepository, "authRepository must not be null");
        this.passwordHasher = Objects.requireNonNull(passwordHasher, "passwordHasher must not be null");
        this.tokenIssuer = Objects.requireNonNull(tokenIssuer, "tokenIssuer must not be null");
    }

    public AuthResult execute(LoginUserCommand command) {
        // Note: Login akisi once user'i porttan bulur, sonra hash karsilastirir ve token uretir.
        Objects.requireNonNull(command, "command must not be null");

        Username username = toUsername(command.username());
        String password = toPassword(command.password());
        User user = authRepository.findByUsername(username)
                .orElseThrow(InvalidCredentialsException::new);

        if (!passwordHasher.matches(password, user.passwordHash())) {
            throw new InvalidCredentialsException();
        }

        return new AuthResult(user, tokenIssuer.issueFor(user));
    }

    private Username toUsername(String username) {
        try {
            return new Username(username);
        } catch (IllegalArgumentException exception) {
            throw new InvalidCredentialsException();
        }
    }

    private String toPassword(String password) {
        if (password == null || password.trim().length() < 3) {
            throw new InvalidCredentialsException();
        }
        return password;
    }
}
