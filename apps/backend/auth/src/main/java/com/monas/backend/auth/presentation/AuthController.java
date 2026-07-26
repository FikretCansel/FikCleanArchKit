package com.monas.backend.auth.presentation;

import com.monas.backend.auth.core.application.result.AuthResult;
import com.monas.backend.auth.core.application.command.LoginUserCommand;
import com.monas.backend.auth.core.application.service.LoginUserUseCase;
import com.monas.backend.auth.core.application.command.RegisterUserCommand;
import com.monas.backend.auth.core.application.service.RegisterUserUseCase;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class AuthController {

    private final LoginUserUseCase loginUserUseCase;
    private final RegisterUserUseCase registerUserUseCase;

    public AuthController(LoginUserUseCase loginUserUseCase, RegisterUserUseCase registerUserUseCase) {
        this.loginUserUseCase = loginUserUseCase;
        this.registerUserUseCase = registerUserUseCase;
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {
        return toResponse(loginUserUseCase.execute(new LoginUserCommand(
                request.username(),
                request.password()
        )));
    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody AuthRequest request) {
        return toResponse(registerUserUseCase.execute(new RegisterUserCommand(
                request.username(),
                request.password()
        )));
    }

    private AuthResponse toResponse(AuthResult result) {
        return new AuthResponse(
                new UserResponse(result.user().username().value(), result.user().displayName()),
                result.token().value()
        );
    }
}

