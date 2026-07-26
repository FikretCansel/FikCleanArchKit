package com.monas.backend.auth.infrastructure;

import com.monas.backend.auth.core.application.port.AuthTokenIssuer;
import com.monas.backend.auth.core.domain.model.AuthToken;
import com.monas.backend.auth.core.domain.model.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.Clock;
import java.time.Instant;
import java.util.Date;

@Component
public class JwtTokenProvider implements AuthTokenIssuer {

    private final SecretKey key;
    private final long expirationSeconds;
    private final Clock clock;

    @Autowired
    public JwtTokenProvider(
            @Value("${auth.jwt.secret}") String secret,
            @Value("${auth.jwt.expiration-seconds}") long expirationSeconds
    ) {
        // Note: @Value application.properties degerlerini Spring bean'e inject eder.
        this(secret, expirationSeconds, Clock.systemUTC());
    }

    public JwtTokenProvider(String secret, long expirationSeconds, Clock clock) {
        // Note: Clock inject edilerek zaman bagimli kod deterministik test edilebilir.
        this.key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        this.expirationSeconds = expirationSeconds;
        this.clock = clock;
    }

    @Override
    public AuthToken issueFor(User user) {
        // Note: JWT stateless authentication saglar; subject ve claim'ler token icinde tasinir.
        Instant issuedAt = clock.instant();
        Instant expiresAt = issuedAt.plusSeconds(expirationSeconds);
        String token = Jwts.builder()
                .subject(user.username().value())
                .claim("username", user.username().value())
                .claim("displayName", user.displayName())
                .issuedAt(Date.from(issuedAt))
                .expiration(Date.from(expiresAt))
                .signWith(key, Jwts.SIG.HS256)
                .compact();

        return new AuthToken(token, expiresAt);
    }
}
