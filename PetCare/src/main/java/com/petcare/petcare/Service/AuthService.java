package com.petcare.petcare.Service;

import com.petcare.petcare.DTO.Auth.AuthResponse;
import com.petcare.petcare.DTO.Auth.LoginRequest;
import com.petcare.petcare.DTO.Auth.RegisterRequest;
import com.petcare.petcare.DTO.User.UpdatePasswordDTO;
import com.petcare.petcare.Entity.User;
import com.petcare.petcare.Exception.InvalidPasswordException;
import com.petcare.petcare.Repository.UserRepository;


import lombok.Data;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
@Data



@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;


    public AuthResponse register(RegisterRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new RuntimeException("Utilizatorul deja există!");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());

        userRepository.save(user);

        String token = jwtService.generateToken(user);
        AuthResponse response = new AuthResponse();
        response.token = token;
        return response;
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.username)
                .orElseThrow(() -> new RuntimeException("Utilizatorul nu a fost gasit!"));

        if (!passwordEncoder.matches(request.password, user.getPassword())) {
            throw new RuntimeException("Parola invalida!");
        }

        String token = jwtService.generateToken(user);
        return new AuthResponse(token);
    }
    public void updatePassword(String username, UpdatePasswordDTO dto) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Utilizatorul nu a fost gasit!"));

        if (!passwordEncoder.matches(dto.getOldPassword(), user.getPassword())) {
            throw new RuntimeException("Parola veche este greșita!");
        }

        user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
        userRepository.save(user);
    }
}