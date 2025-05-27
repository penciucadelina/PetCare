package com.petcare.petcare.Service;

import com.petcare.petcare.Entity.Pet;
import com.petcare.petcare.Entity.User;
import com.petcare.petcare.Repository.PetRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class PetService {

    private final PetRepository petRepository;

    public PetService(PetRepository petRepository) {
        this.petRepository = petRepository;
    }

    public List<Pet> findByUser(User user) {
        return petRepository.findByUser(user);
    }

    public Optional<Pet> findById(Long id) {
        return petRepository.findById(id);
    }

    public Pet save(Pet pet) {
        return petRepository.save(pet);
    }

    public void delete(Pet pet) {
        petRepository.delete(pet);
    }


}