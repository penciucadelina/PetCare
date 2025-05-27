package com.petcare.petcare.DTO.User;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdatePhoneDTO {
    @NotBlank(message = "Numărul de telefon nu poate fi gol.")
    private String phone;
}