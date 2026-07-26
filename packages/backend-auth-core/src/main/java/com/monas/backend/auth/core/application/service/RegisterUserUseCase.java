package com.monas.backend.auth.core.application.service;

import com.monas.backend.auth.core.application.command.RegisterUserCommand;
import com.monas.backend.auth.core.application.exception.UserAlreadyExistsException;
import com.monas.backend.auth.core.application.port.AuthTokenIssuer;
import com.monas.backend.auth.core.application.port.PasswordHasher;
import com.monas.backend.auth.core.application.result.AuthResult;
import com.monas.backend.auth.core.application.validation.CredentialsValidator;
import com.monas.backend.auth.core.domain.model.User;
import com.monas.backend.auth.core.domain.model.Username;
import com.monas.backend.auth.core.domain.port.AuthRepository;

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
        // Note: Use-case somut DB/JWT/BCrypt siniflarina degil port arayuzlerine baglanir.
        this.authRepository = Objects.requireNonNull(authRepository, "authRepository must not be null");
        this.passwordHasher = Objects.requireNonNull(passwordHasher, "passwordHasher must not be null");
        this.tokenIssuer = Objects.requireNonNull(tokenIssuer, "tokenIssuer must not be null");
    }

    public AuthResult execute(RegisterUserCommand command) {
        // Note: Application service tek bir is akisini yonetir: validate, kontrol et, kaydet, token uret.
        Objects.requireNonNull(command, "command must not be null");

        Username username = new Username(command.username());
        String password = CredentialsValidator.requireValidPassword(command.password());

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
