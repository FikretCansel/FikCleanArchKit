package com.monas.backend.auth.core.application.exception;

public class UserAlreadyExistsException extends RuntimeException {

    public UserAlreadyExistsException(String username) {
        super("Kullanici zaten mevcut: " + username);
    }
}
