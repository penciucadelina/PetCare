package com.petcare.petcare.DTO.User;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data

public class UpdatePasswordDTO {
    @NotBlank
    private String oldPassword;

    @NotBlank
    private String newPassword;
}