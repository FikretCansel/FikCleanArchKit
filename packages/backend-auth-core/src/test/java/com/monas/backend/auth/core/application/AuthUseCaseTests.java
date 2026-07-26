package com.monas.backend.auth.core.application;

import com.monas.backend.auth.core.domain.AuthRepository;
import com.monas.backend.auth.core.domain.AuthToken;
import com.monas.backend.auth.core.domain.PasswordHash;
import com.monas.backend.auth.core.domain.User;
import com.monas.backend.auth.core.domain.Username;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.Instant;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class AuthUseCaseTests {

    private InMemoryRepository repository;
    private PlainPasswordHasher passwordHasher;
    private AuthTokenIssuer tokenIssuer;

    @BeforeEach
    void setUp() {
        repository = new InMemoryRepository();
        passwordHasher = new PlainPasswordHasher();
        tokenIssuer = user -> new AuthToken("token-" + user.username().value(), Instant.now().plusSeconds(3600));
        repository.save(new User(new Username("fikret"), "Fikret", passwordHasher.hash("fikret")));
    }

    @Test
    void loginSucceedsForSeedUser() {
        AuthResult result = new LoginUserUseCase(repository, passwordHasher, tokenIssuer)
                .execute(new LoginUserCommand("fikret", "fikret"));

        assertEquals("fikret", result.user().username().value());
        assertEquals("token-fikret", result.token().value());
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
    void registerCreatesUser() {
        AuthResult result = new RegisterUserUseCase(repository, passwordHasher, tokenIssuer)
                .execute(new RegisterUserCommand("ayse", "secret"));

        assertEquals("ayse", result.user().username().value());
        assertEquals("token-ayse", result.token().value());
    }

    @Test
    void registerFailsForDuplicateUser() {
        RegisterUserUseCase useCase = new RegisterUserUseCase(repository, passwordHasher, tokenIssuer);

        assertThrows(
                UserAlreadyExistsException.class,
                () -> useCase.execute(new RegisterUserCommand("fikret", "fikret"))
        );
    }

    private static class InMemoryRepository implements AuthRepository {
        private final Map<String, User> users = new ConcurrentHashMap<>();

        @Override
        public Optional<User> findByUsername(Username username) {
            return Optional.ofNullable(users.get(username.value()));
        }

        @Override
        public boolean existsByUsername(Username username) {
            return users.containsKey(username.value());
        }

        @Override
        public User save(User user) {
            users.put(user.username().value(), user);
            return user;
        }
    }

    private static class PlainPasswordHasher implements PasswordHasher {
        @Override
        public PasswordHash hash(String rawPassword) {
            return new PasswordHash("{plain}" + rawPassword);
        }

        @Override
        public boolean matches(String rawPassword, PasswordHash passwordHash) {
            return passwordHash.value().equals("{plain}" + rawPassword);
        }
    }
}
