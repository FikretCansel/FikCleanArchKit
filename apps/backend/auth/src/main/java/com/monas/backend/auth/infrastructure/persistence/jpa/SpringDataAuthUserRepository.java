package com.monas.backend.auth.infrastructure.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

interface SpringDataAuthUserRepository extends JpaRepository<AuthUserEntity, String> {
}
