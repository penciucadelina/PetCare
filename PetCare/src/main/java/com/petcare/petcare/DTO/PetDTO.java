package com.petcare.petcare.DTO;
import lombok.Data;

@Data
public class PetDTO {
    private String name;
    private String type;
    private String breed;
    private int age;

}