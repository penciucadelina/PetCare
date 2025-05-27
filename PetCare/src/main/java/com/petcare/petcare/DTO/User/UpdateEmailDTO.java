package com.petcare.petcare.DTO.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateEmailDTO {
    @NotBlank(message = "Emailul nu poate fi gol.")
    @Email(message = "Emailul nu este valid.")
    private String email;
}