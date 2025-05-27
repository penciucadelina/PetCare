package com.petcare.petcare.Controller;

import com.petcare.petcare.DTO.MedicalRecordDTO;
import com.petcare.petcare.Entity.Appointment;
import com.petcare.petcare.Entity.MedicalRecord;
import com.petcare.petcare.Entity.Pet;
import com.petcare.petcare.Entity.User;
import com.petcare.petcare.Repository.AppointmentRepository;
import com.petcare.petcare.Repository.MedicalRecordRepository;
import com.petcare.petcare.Repository.PetRepository;
import com.petcare.petcare.Repository.UserRepository;
import com.petcare.petcare.Service.MedicalRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
@RestController
@RequestMapping("/medical-records")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class MedicalRecordController {

    private final MedicalRecordService medicalRecordService;
    private final PetRepository petRepository;
    private final UserRepository userRepository;

    @GetMapping("/pet/{petId}")
    public List<MedicalRecord> getByPetId(@PathVariable Long petId) {
        return medicalRecordService.getByPetId(petId);
    }

    @PostMapping
    public ResponseEntity<?> addRecord(@RequestBody MedicalRecordDTO recordDTO, Principal principal) {
        User user = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new RuntimeException("Utilizator inexistent"));

        Pet pet = petRepository.findById(recordDTO.getPetId())
                .orElseThrow(() -> new RuntimeException("Pet inexistent"));

        if (!pet.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Nu ai acces să adaugi date medicale pentru acest animal.");
        }

        MedicalRecord record = new MedicalRecord();
        record.setDiagnosis(recordDTO.getDiagnosis());
        record.setTreatment(recordDTO.getTreatment());
        record.setDate(recordDTO.getDate());
        record.setPet(pet);

        return ResponseEntity.ok(medicalRecordService.save(record));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id, Principal principal) {
        User user = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new RuntimeException("Utilizator inexistent."));

        MedicalRecord record = medicalRecordService.findById(id)
                .orElseThrow(() -> new RuntimeException("MedicalRecord inexistent."));

        if (!record.getPet().getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Nu ai voie să ștergi această fișă medicală.");
        }

        medicalRecordService.delete(id);
        return ResponseEntity.ok("Fișa medicală a fost ștearsă.");
    }
}