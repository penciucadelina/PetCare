package com.petcare.petcare.Controller;
import com.petcare.petcare.DTO.User.UpdateEmailDTO;
import com.petcare.petcare.DTO.User.UpdatePhoneDTO;
import com.petcare.petcare.DTO.User.UserProfileDTO;
import com.petcare.petcare.Service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserProfileDTO> getMyProfile(Principal principal) {
        return ResponseEntity.ok(userService.getProfile(principal.getName()));
    }

    @PutMapping("/me/phone")
    public ResponseEntity<?> updatePhone(@RequestBody @Valid UpdatePhoneDTO updatePhoneDto, Principal principal) {
        userService.updatePhone(principal.getName(), updatePhoneDto);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/me/email")
    public ResponseEntity<?> updateEmail(@RequestBody UpdateEmailDTO updateEmailDTO, Principal principal) {
        userService.updateEmail(principal.getName(), updateEmailDTO);
        return ResponseEntity.ok().build();
    }
}