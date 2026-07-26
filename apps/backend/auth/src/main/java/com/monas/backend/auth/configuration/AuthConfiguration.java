package com.monas.backend.auth.configuration;

import com.monas.backend.auth.core.application.AuthTokenIssuer;
import com.monas.backend.auth.core.application.LoginUserUseCase;
import com.monas.backend.auth.core.application.PasswordHasher;
import com.monas.backend.auth.core.application.RegisterUserUseCase;
import com.monas.backend.auth.core.domain.AuthRepository;
import com.monas.backend.auth.core.domain.User;
import com.monas.backend.auth.core.domain.Username;
import com.monas.backend.auth.infrastructure.BCryptPasswordHasher;
import com.monas.backend.auth.infrastructure.InMemoryAuthRepository;
import com.monas.backend.auth.infrastructure.JwtTokenProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AuthConfiguration {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public PasswordHasher passwordHasher(PasswordEncoder passwordEncoder) {
        return new BCryptPasswordHasher(passwordEncoder);
    }

    @Bean
    public AuthRepository authRepository(PasswordHasher passwordHasher) {
        InMemoryAuthRepository repository = new InMemoryAuthRepository();
        User seedUser = new User(
                new Username("fikret"),
                "Fikret",
                passwordHasher.hash("fikret")
        );
        repository.save(seedUser);
        return repository;
    }

    @Bean
    public AuthTokenIssuer authTokenIssuer(JwtTokenProvider tokenProvider) {
        return tokenProvider;
    }

    @Bean
    public LoginUserUseCase loginUserUseCase(
            AuthRepository authRepository,
            PasswordHasher passwordHasher,
            AuthTokenIssuer authTokenIssuer
    ) {
        return new LoginUserUseCase(authRepository, passwordHasher, authTokenIssuer);
    }

    @Bean
    public RegisterUserUseCase registerUserUseCase(
            AuthRepository authRepository,
            PasswordHasher passwordHasher,
            AuthTokenIssuer authTokenIssuer
    ) {
        return new RegisterUserUseCase(authRepository, passwordHasher, authTokenIssuer);
    }
}
