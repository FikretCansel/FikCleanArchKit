package com.monas.backend.auth.core.application.exception;

public class InvalidCredentialsException extends RuntimeException {

    public InvalidCredentialsException() {
        super("Kullanici adi veya sifre hatali.");
    }
}
