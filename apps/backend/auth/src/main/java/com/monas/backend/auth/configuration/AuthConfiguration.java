package com.monas.backend.auth.configuration;

import com.monas.backend.auth.core.application.port.AuthTokenIssuer;
import com.monas.backend.auth.core.application.port.PasswordHasher;
import com.monas.backend.auth.core.application.service.LoginUserUseCase;
import com.monas.backend.auth.core.application.service.RegisterUserUseCase;
import com.monas.backend.auth.core.domain.model.User;
import com.monas.backend.auth.core.domain.model.Username;
import com.monas.backend.auth.core.domain.port.AuthRepository;
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
        // Note: BCryptPasswordEncoder Spring Security'nin tek yonlu parola hashleme aracidir.
        return new BCryptPasswordEncoder();
    }

    @Bean
    public PasswordHasher passwordHasher(PasswordEncoder passwordEncoder) {
        // Note: Adapter pattern; core PasswordHasher portunu Spring Security BCrypt ile dolduruyoruz.
        return new BCryptPasswordHasher(passwordEncoder);
    }

    @Bean
    public AuthRepository authRepository(PasswordHasher passwordHasher) {
        // Note: Repository portuna in-memory adapter baglaniyor; gercek DB gelirse sadece adapter degisir.
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
        // Note: Dependency Inversion; use-case JWT sinifini degil AuthTokenIssuer portunu bilir.
        return tokenProvider;
    }

    @Bean
    public LoginUserUseCase loginUserUseCase(
            AuthRepository authRepository,
            PasswordHasher passwordHasher,
            AuthTokenIssuer authTokenIssuer
    ) {
        // Note: Constructor injection ile use-case bagimlilikleri disaridan verilir, test etmek kolaylasir.
        return new LoginUserUseCase(authRepository, passwordHasher, authTokenIssuer);
    }

    @Bean
    public RegisterUserUseCase registerUserUseCase(
            AuthRepository authRepository,
            PasswordHasher passwordHasher,
            AuthTokenIssuer authTokenIssuer
    ) {
        // Note: Configuration class composition root gibi calisir; nesne grafigi burada kurulur.
        return new RegisterUserUseCase(authRepository, passwordHasher, authTokenIssuer);
    }
}
