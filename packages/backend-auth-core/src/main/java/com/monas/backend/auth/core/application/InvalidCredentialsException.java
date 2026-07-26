package com.monas.backend.auth.core.application;

public class InvalidCredentialsException extends RuntimeException {

    public InvalidCredentialsException() {
        super("Kullanici adi veya sifre hatali.");
    }
}
