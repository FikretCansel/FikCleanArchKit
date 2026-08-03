package com.monas.backend.auth.infrastructure;

import com.monas.backend.auth.core.domain.model.User;
import com.monas.backend.auth.core.domain.model.Username;
import com.monas.backend.auth.core.domain.port.AuthRepository;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

public class InMemoryAuthRepository implements AuthRepository {

    private final Map<String, User> users = new ConcurrentHashMap<>();

    @Override
    public Optional<User> findByUsername(Username username) {
        // Note: Repository pattern; core veri kaynaginin Map mi DB mi oldugunu bilmez.
        return Optional.ofNullable(users.get(username.value()));
    }

    @Override
    public boolean existsByUsername(Username username) {
        return users.containsKey(username.value());
    }

    @Override
    public User save(User user) {
        // Note: In-memory adapter demo/test icin kullanilir; varsayilan app adapter'i JPA/H2'dir.
        users.put(user.username().value(), user);
        return user;
    }
}
