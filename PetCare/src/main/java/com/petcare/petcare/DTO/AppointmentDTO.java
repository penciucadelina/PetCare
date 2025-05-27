package com.petcare.petcare.DTO;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class AppointmentDTO {
    private String description;
    private LocalDateTime appointmentDate;
    private Long petId;
}