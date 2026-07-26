package com.monas.backend.auth.infrastructure;

import com.monas.backend.auth.core.domain.AuthRepository;
import com.monas.backend.auth.core.domain.User;
import com.monas.backend.auth.core.domain.Username;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

public class InMemoryAuthRepository implements AuthRepository {

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
