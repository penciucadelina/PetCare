package com.petcare.petcare.Controller;

import com.petcare.petcare.DTO.Auth.AuthResponse;
import com.petcare.petcare.DTO.Auth.LoginRequest;
import com.petcare.petcare.DTO.Auth.RegisterRequest;
import com.petcare.petcare.DTO.User.UpdatePasswordDTO;
import com.petcare.petcare.Entity.User;
import com.petcare.petcare.Repository.UserRepository;
import com.petcare.petcare.Service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody @Valid RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }
    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody @Valid UpdatePasswordDTO dto, Principal principal) {
        authService.updatePassword(principal.getName(), dto);
        return ResponseEntity.ok(Map.of("message", "Parola a fost actualizată cu succes!"));
    }
}
