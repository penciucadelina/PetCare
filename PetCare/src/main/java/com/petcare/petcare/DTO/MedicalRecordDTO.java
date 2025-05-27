package com.petcare.petcare.DTO;

import lombok.Data;

import java.time.LocalDate;

@Data
public class MedicalRecordDTO {
    private String diagnosis;
    private String treatment;
    private LocalDate date;
    private Long petId;
}
