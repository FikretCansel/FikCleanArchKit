package com.monas.backend.auth.core.application.service;

import com.monas.backend.auth.core.application.command.LoginUserCommand;
import com.monas.backend.auth.core.application.command.RegisterUserCommand;
import com.monas.backend.auth.core.application.exception.InvalidCredentialsException;
import com.monas.backend.auth.core.application.exception.UserAlreadyExistsException;
import com.monas.backend.auth.core.application.port.AuthTokenIssuer;
import com.monas.backend.auth.core.application.port.PasswordHasher;
import com.monas.backend.auth.core.application.result.AuthResult;
import com.monas.backend.auth.core.domain.model.AuthToken;
import com.monas.backend.auth.core.domain.model.PasswordHash;
import com.monas.backend.auth.core.domain.model.User;
import com.monas.backend.auth.core.domain.model.Username;
import com.monas.backend.auth.core.domain.port.AuthRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class AuthUseCaseTests {

    private final Map<String, User> users = new ConcurrentHashMap<>();

    private AuthRepository repository;
    private PasswordHasher passwordHasher;
    private AuthTokenIssuer tokenIssuer;

    @BeforeEach
    void setUp() {
        repository = mock(AuthRepository.class);
        passwordHasher = mock(PasswordHasher.class);
        tokenIssuer = mock(AuthTokenIssuer.class);

        when(repository.findByUsername(any(Username.class)))
                .thenAnswer(invocation -> Optional.ofNullable(users.get(invocation.<Username>getArgument(0).value())));
        when(repository.existsByUsername(any(Username.class)))
                .thenAnswer(invocation -> users.containsKey(invocation.<Username>getArgument(0).value()));
        when(repository.save(any(User.class)))
                .thenAnswer(invocation -> {
                    User user = invocation.getArgument(0);
                    users.put(user.username().value(), user);
                    return user;
                });

        when(passwordHasher.hash(anyString()))
                .thenAnswer(invocation -> new PasswordHash("{plain}" + invocation.<String>getArgument(0)));
        when(passwordHasher.matches(anyString(), any(PasswordHash.class)))
                .thenAnswer(invocation -> invocation.<PasswordHash>getArgument(1).value()
                        .equals("{plain}" + invocation.<String>getArgument(0)));
        when(tokenIssuer.issueFor(any(User.class)))
                .thenAnswer(invocation -> {
                    User user = invocation.getArgument(0);
                    return new AuthToken("token-" + user.username().value(), Instant.parse("2026-01-01T01:00:00Z"));
                });

        users.put("fikret", new User(new Username("fikret"), "Fikret", new PasswordHash("{plain}fikret")));
    }

    @Test
    void loginSucceedsForSeedUser() {
        AuthResult result = new LoginUserUseCase(repository, passwordHasher, tokenIssuer)
                .execute(new LoginUserCommand("fikret", "fikret"));

        assertEquals("fikret", result.user().username().value());
        assertEquals("token-fikret", result.token().value());
        verify(repository).findByUsername(new Username("fikret"));
        verify(passwordHasher).matches("fikret", new PasswordHash("{plain}fikret"));
    }

    @Test
    void loginFailsForWrongPassword() {
        LoginUserUseCase useCase = new LoginUserUseCase(repository, passwordHasher, tokenIssuer);

        assertThrows(
                InvalidCredentialsException.class,
                () -> useCase.execute(new LoginUserCommand("fikret", "wrong"))
        );
    }

    @Test
    void loginFailsForUnknownUser() {
        LoginUserUseCase useCase = new LoginUserUseCase(repository, passwordHasher, tokenIssuer);

        assertThrows(
                InvalidCredentialsException.class,
                () -> useCase.execute(new LoginUserCommand("unknown", "secret"))
        );
    }

    @Test
    void registerCreatesUser() {
        AuthResult result = new RegisterUserUseCase(repository, passwordHasher, tokenIssuer)
                .execute(new RegisterUserCommand("ayse", "secret"));

        assertEquals("ayse", result.user().username().value());
        assertEquals("ayse", users.get("ayse").displayName());
        assertEquals("token-ayse", result.token().value());
        verify(repository).existsByUsername(new Username("ayse"));
        verify(repository).save(new User(new Username("ayse"), "ayse", new PasswordHash("{plain}secret")));
    }

    @Test
    void registerFailsForDuplicateUser() {
        RegisterUserUseCase useCase = new RegisterUserUseCase(repository, passwordHasher, tokenIssuer);

        assertThrows(
                UserAlreadyExistsException.class,
                () -> useCase.execute(new RegisterUserCommand("fikret", "fikret"))
        );
    }

    @Test
    void registerFailsForInvalidInput() {
        RegisterUserUseCase useCase = new RegisterUserUseCase(repository, passwordHasher, tokenIssuer);

        assertThrows(
                IllegalArgumentException.class,
                () -> useCase.execute(new RegisterUserCommand("ab", "xy"))
        );
    }
}
