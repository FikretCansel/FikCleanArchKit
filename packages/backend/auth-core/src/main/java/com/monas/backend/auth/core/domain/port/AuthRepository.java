package com.monas.backend.auth.core.domain.port;

import com.monas.backend.auth.core.domain.model.User;
import com.monas.backend.auth.core.domain.model.Username;

import java.util.Optional;

public interface AuthRepository {
    Optional<User> findByUsername(Username username);

    boolean existsByUsername(Username username);

    User save(User user);
}
