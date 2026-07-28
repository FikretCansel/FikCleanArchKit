package com.monas.backend.auth.presentation;

import com.monas.backend.auth.core.application.command.LoginUserCommand;
import com.monas.backend.auth.core.application.command.RegisterUserCommand;
import com.monas.backend.auth.core.application.result.AuthResult;
import com.monas.backend.auth.core.application.service.LoginUserUseCase;
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
        // Note: Constructor injection field injection'a gore daha test edilebilir ve immutability saglar.
        this.loginUserUseCase = loginUserUseCase;
        this.registerUserUseCase = registerUserUseCase;
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {
        // Note: Controller sadece HTTP/DTO cevirisi yapar; is kurali use-case katmanindadir.
        return toResponse(loginUserUseCase.execute(new LoginUserCommand(
                request.username(),
                request.password()
        )));
    }

    @PostMapping("/register")
    public AuthResponse register(@RequestBody AuthRequest request) {
        // Note: Request DTO application command'a cevrilerek presentation ile core ayrilir.
        return toResponse(registerUserUseCase.execute(new RegisterUserCommand(
                request.username(),
                request.password()
        )));
    }

    private AuthResponse toResponse(AuthResult result) {
        // Note: Response DTO domain modelin dis API'ya direkt sizmasini engeller.
        return new AuthResponse(
                new UserResponse(result.user().username().value(), result.user().displayName()),
                result.token().value()
        );
    }
}
