package com.monas.backend.auth.core.application.port;

import com.monas.backend.auth.core.domain.model.AuthToken;
import com.monas.backend.auth.core.domain.model.User;

public interface AuthTokenIssuer {
    AuthToken issueFor(User user);
}
