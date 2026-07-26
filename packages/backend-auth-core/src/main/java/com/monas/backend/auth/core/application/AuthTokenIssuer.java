package com.monas.backend.auth.core.application;

import com.monas.backend.auth.core.domain.AuthToken;
import com.monas.backend.auth.core.domain.User;

public interface AuthTokenIssuer {
    AuthToken issueFor(User user);
}
