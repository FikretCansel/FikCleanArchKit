package com.monas.backend.auth.infrastructure.persistence.jpa;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "auth_users")
class AuthUserEntity {

    @Id
    @Column(nullable = false, length = 100)
    private String username;

    @Column(nullable = false, length = 150)
    private String displayName;

    @Column(nullable = false, length = 100)
    private String passwordHash;

    protected AuthUserEntity() {
    }

    AuthUserEntity(String username, String displayName, String passwordHash) {
        this.username = username;
        this.displayName = displayName;
        this.passwordHash = passwordHash;
    }

    String getUsername() {
        return username;
    }

    String getDisplayName() {
        return displayName;
    }

    String getPasswordHash() {
        return passwordHash;
    }
}
