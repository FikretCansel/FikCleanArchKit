package com.monas.backend.auth.core.application.validation;

public final class CredentialsValidator {

    public static final String MINIMUM_LENGTH_MESSAGE = "Kullanici adi ve sifre en az 3 karakter olmali.";

    private CredentialsValidator() {
    }

    public static String requireValidPassword(String password) {
        if (password == null) {
            throw new IllegalArgumentException(MINIMUM_LENGTH_MESSAGE);
        }
        String normalizedPassword = password.trim();
        if (normalizedPassword.length() < 3) {
            throw new IllegalArgumentException(MINIMUM_LENGTH_MESSAGE);
        }
        return normalizedPassword;
    }
}
