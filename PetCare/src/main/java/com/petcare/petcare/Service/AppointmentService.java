package com.petcare.petcare.Service;

import com.petcare.petcare.DTO.AppointmentDTO;
import com.petcare.petcare.Entity.Appointment;
import com.petcare.petcare.Entity.Pet;
import com.petcare.petcare.Entity.User;
import com.petcare.petcare.Repository.AppointmentRepository;
import com.petcare.petcare.Repository.PetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;


    public List<Appointment> findAll() {
        return appointmentRepository.findAll();
    }

    public Optional<Appointment> findById(Long id) {
        return appointmentRepository.findById(id);
    }

    public List<Appointment> findByPetId(Long petId) {
        return appointmentRepository.findByPetId(petId);
    }

    // Metoda nouă pentru a găsi după user
    public List<Appointment> findByUser(com.petcare.petcare.Entity.User user) {
        return appointmentRepository.findByPetUser(user);
    }

    public Appointment save(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    public void delete(Long id) {
        appointmentRepository.deleteById(id);
    }
}
