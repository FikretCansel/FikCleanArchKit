package com.monas.backend.auth.core.domain;

public record Username(String value) {

    public Username {
        if (value == null) {
            throw new IllegalArgumentException("Kullanici adi ve sifre en az 3 karakter olmali.");
        }
        value = value.trim();
        if (value.length() < 3) {
            throw new IllegalArgumentException("Kullanici adi ve sifre en az 3 karakter olmali.");
        }
    }
}
