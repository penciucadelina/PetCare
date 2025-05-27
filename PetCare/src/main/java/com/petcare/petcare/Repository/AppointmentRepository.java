package com.petcare.petcare.Repository;

import com.petcare.petcare.Entity.Appointment;
import com.petcare.petcare.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByPetId(Long petId);

    List<Appointment> findByPetUser(User user);

    @Query("SELECT a FROM Appointment a WHERE a.appointmentDate >= CURRENT_TIMESTAMP")
    List<Appointment> findUpcomingAppointments();

}