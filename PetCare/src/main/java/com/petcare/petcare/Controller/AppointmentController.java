package com.petcare.petcare.Controller;

import com.petcare.petcare.DTO.AppointmentDTO;
import com.petcare.petcare.Entity.Appointment;
import com.petcare.petcare.Entity.Pet;
import com.petcare.petcare.Entity.User;
import com.petcare.petcare.Repository.PetRepository;
import com.petcare.petcare.Service.AppointmentService;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final PetRepository petRepository;

    // 1. Get all appointments for the logged-in user
    @GetMapping
    public List<Appointment> getAppointments(@AuthenticationPrincipal com.petcare.petcare.Entity.User user) {
        return appointmentService.findByUser(user);
    }

    // 2. Get appointment by id
    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) {
        return appointmentService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // 3. Get appointments by pet id
    @GetMapping("/pet/{petId}")
    public List<Appointment> getAppointmentsByPetId(@PathVariable Long petId) {
        return appointmentService.findByPetId(petId);
    }

    // 4. Create a new appointment for the logged-in user's pet
    @PostMapping
    public ResponseEntity<?> addAppointment(@RequestBody AppointmentDTO appointmentDTO, @AuthenticationPrincipal com.petcare.petcare.Entity.User user) {
        Pet pet = petRepository.findById(appointmentDTO.getPetId())
                .filter(p -> p.getUser().getId().equals(user.getId()))
                .orElseThrow(() -> new RuntimeException("Nu ai acces la acest animal."));

        Appointment appointment = new Appointment();
        appointment.setDescription(appointmentDTO.getDescription());
        appointment.setAppointmentDate(appointmentDTO.getAppointmentDate());
        appointment.setPet(pet);

        return ResponseEntity.ok(appointmentService.save(appointment));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id, @AuthenticationPrincipal com.petcare.petcare.Entity.User user) {
        return appointmentService.findById(id)
                .map(appointment -> {
                    if (!appointment.getPet().getUser().getId().equals(user.getId())) {
                        ResponseEntity<Void> forbidden = ResponseEntity.status(HttpStatus.FORBIDDEN).build();
                        return forbidden;
                    }
                    appointmentService.delete(id);
                    ResponseEntity<Void> noContent = ResponseEntity.noContent().build();
                    return noContent;
                })
                .orElse(ResponseEntity.notFound().build());
    }


}