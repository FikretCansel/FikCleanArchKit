package com.monas.backend.auth.core.application;

import com.monas.backend.auth.core.domain.AuthRepository;
import com.monas.backend.auth.core.domain.User;
import com.monas.backend.auth.core.domain.Username;

import java.util.Objects;

public class RegisterUserUseCase {

    private final AuthRepository authRepository;
    private final PasswordHasher passwordHasher;
    private final AuthTokenIssuer tokenIssuer;

    public RegisterUserUseCase(
            AuthRepository authRepository,
            PasswordHasher passwordHasher,
            AuthTokenIssuer tokenIssuer
    ) {
        this.authRepository = Objects.requireNonNull(authRepository, "authRepository must not be null");
        this.passwordHasher = Objects.requireNonNull(passwordHasher, "passwordHasher must not be null");
        this.tokenIssuer = Objects.requireNonNull(tokenIssuer, "tokenIssuer must not be null");
    }

    public AuthResult execute(RegisterUserCommand command) {
        Objects.requireNonNull(command, "command must not be null");

        Username username = new Username(command.username());
        if (command.password() == null) {
            throw new IllegalArgumentException("Kullanici adi ve sifre en az 3 karakter olmali.");
        }
        String password = command.password().trim();
        if (password.length() < 3) {
            throw new IllegalArgumentException("Kullanici adi ve sifre en az 3 karakter olmali.");
        }

        if (authRepository.existsByUsername(username)) {
            throw new UserAlreadyExistsException(username.value());
        }

        User user = authRepository.save(new User(
                username,
                username.value(),
                passwordHasher.hash(password)
        ));

        return new AuthResult(user, tokenIssuer.issueFor(user));
    }
}
