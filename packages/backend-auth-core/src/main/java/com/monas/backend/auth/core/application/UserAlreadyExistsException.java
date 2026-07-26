package com.monas.backend.auth.core.application;

public class UserAlreadyExistsException extends RuntimeException {

    public UserAlreadyExistsException(String username) {
        super("Kullanici zaten mevcut: " + username);
    }
}
