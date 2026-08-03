package com.monas.backend.auth.infrastructure.persistence;

import com.monas.backend.auth.core.domain.model.PasswordHash;
import com.monas.backend.auth.core.domain.model.User;
import com.monas.backend.auth.core.domain.model.Username;
import com.monas.backend.auth.core.domain.port.AuthRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class JpaAuthRepository implements AuthRepository {

    private final SpringDataAuthUserRepository repository;

    public JpaAuthRepository(SpringDataAuthUserRepository repository) {
        this.repository = repository;
    }

    @Override
    public Optional<User> findByUsername(Username username) {
        return repository.findById(username.value()).map(this::toDomain);
    }

    @Override
    public boolean existsByUsername(Username username) {
        return repository.existsById(username.value());
    }

    @Override
    public User save(User user) {
        AuthUserEntity saved = repository.save(toEntity(user));
        return toDomain(saved);
    }

    private User toDomain(AuthUserEntity entity) {
        return new User(
                new Username(entity.getUsername()),
                entity.getDisplayName(),
                new PasswordHash(entity.getPasswordHash())
        );
    }

    private AuthUserEntity toEntity(User user) {
        return new AuthUserEntity(
                user.username().value(),
                user.displayName(),
                user.passwordHash().value()
        );
    }
}
