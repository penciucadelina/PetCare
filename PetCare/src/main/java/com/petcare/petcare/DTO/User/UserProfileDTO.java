package com.petcare.petcare.DTO.User;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserProfileDTO {
    private String username;
    private String fullName;
    private String email;
    private String phone;
}