package com.monas.backend.auth.presentation;

public record AuthResponse(UserResponse user, String token) {
}
