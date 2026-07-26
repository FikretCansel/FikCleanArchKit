package com.monas.backend.auth.core.application;

import com.monas.backend.auth.core.domain.AuthRepository;
import com.monas.backend.auth.core.domain.User;
import com.monas.backend.auth.core.domain.Username;

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
        this.authRepository = Objects.requireNonNull(authRepository, "authRepository must not be null");
        this.passwordHasher = Objects.requireNonNull(passwordHasher, "passwordHasher must not be null");
        this.tokenIssuer = Objects.requireNonNull(tokenIssuer, "tokenIssuer must not be null");
    }

    public AuthResult execute(LoginUserCommand command) {
        Objects.requireNonNull(command, "command must not be null");

        Username username = new Username(command.username());
        String password = command.password();
        if (password == null || password.trim().length() < 3) {
            throw new InvalidCredentialsException();
        }
        User user = authRepository.findByUsername(username)
                .orElseThrow(InvalidCredentialsException::new);

        if (!passwordHasher.matches(password, user.passwordHash())) {
            throw new InvalidCredentialsException();
        }

        return new AuthResult(user, tokenIssuer.issueFor(user));
    }
}
