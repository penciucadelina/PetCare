package com.petcare.petcare.Service;

import com.petcare.petcare.DTO.User.UpdateEmailDTO;
import com.petcare.petcare.DTO.User.UpdatePhoneDTO;
import com.petcare.petcare.DTO.User.UserProfileDTO;
import com.petcare.petcare.Entity.User;
import com.petcare.petcare.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserProfileDTO getProfile(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Utilizatorul nu a fost găsit!"));

        return new UserProfileDTO(
                user.getUsername(),
                user.getFullName(),
                user.getEmail(),
                user.getPhone()
        );
    }

    public void updatePhone(String username, UpdatePhoneDTO dto) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Utilizatorul nu a fost găsit!"));

        user.setPhone(dto.getPhone());
        userRepository.save(user);
    }

    public void updateEmail(String username, UpdateEmailDTO dto) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Utilizatorul nu a fost găsit!"));

        user.setEmail(dto.getEmail());
        userRepository.save(user);
    }
}