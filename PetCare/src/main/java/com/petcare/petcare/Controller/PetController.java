package com.petcare.petcare.Controller;

import com.petcare.petcare.DTO.PetDTO;
import com.petcare.petcare.Entity.Pet;
import com.petcare.petcare.Entity.User;
import com.petcare.petcare.Service.PetService;
import com.petcare.petcare.Repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pets")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
public class PetController {

    private final PetService petService;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Pet>> getPets(@AuthenticationPrincipal User user) {
        // Preluăm animalele pentru userul autentificat
        List<Pet> pets = petService.findByUser(user);
        return ResponseEntity.ok(pets);
    }

    @PostMapping
    public ResponseEntity<Pet> addPet(@RequestBody PetDTO petDTO, @AuthenticationPrincipal User user) {
        Pet pet = new Pet();
        pet.setName(petDTO.getName());
        pet.setType(petDTO.getType());
        pet.setBreed(petDTO.getBreed());
        pet.setAge(petDTO.getAge());
        pet.setUser(user);

        Pet savedPet = petService.save(pet);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedPet);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePet(@PathVariable Long id, @AuthenticationPrincipal com.petcare.petcare.Entity.User user) {
        return petService.findById(id)
                .map(pet -> {
                    if (!pet.getUser().getId().equals(user.getId())) {
                        ResponseEntity<Void> forbidden = ResponseEntity.status(HttpStatus.FORBIDDEN).build();
                        return forbidden;
                    }
                    petService.delete(pet);
                    ResponseEntity<Void> noContent = ResponseEntity.noContent().build();
                    return noContent;// aici e ok, noContent() este ResponseEntity<Void>
                })
                .orElse(ResponseEntity.notFound().build()); // aici de asemenea, no body, e ResponseEntity<Void>
    }



}
