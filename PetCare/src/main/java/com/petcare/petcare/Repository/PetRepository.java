package com.petcare.petcare.Repository;

import com.petcare.petcare.Entity.Pet;
import com.petcare.petcare.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Long> {
    List<Pet> findByUser(User user);
}