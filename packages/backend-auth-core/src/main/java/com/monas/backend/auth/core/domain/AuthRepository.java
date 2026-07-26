package com.monas.backend.auth.core.domain;

import java.util.Optional;

public interface AuthRepository {
    Optional<User> findByUsername(Username username);

    boolean existsByUsername(Username username);

    User save(User user);
}
