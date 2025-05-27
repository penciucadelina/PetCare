import { Component, OnInit } from '@angular/core';
import { PetService } from '../services/pet.service';
import { Pet, PetDTO } from '../models/pet.model';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pets',
  standalone: true, 
  imports: [CommonModule, FormsModule], // 🔸 adaugă FormsModule aici
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit {
 pets: Pet[] = [];
  newPet: PetDTO = { name: '', type: '', breed: '', age: 0 };

  constructor(private petService: PetService) {}

 ngOnInit(): void {
  this.loadPets();
}
loadPets(): void {
  this.petService.getPets().subscribe({
    next: pets => {
      this.pets = pets;
      console.log('Lista de animale:', this.pets);
    },
    error: err => {
      console.error('Eroare la încărcarea animalelor:', err);
    }
  });
}
  
  addPet(): void {
  this.petService.addPet(this.newPet).subscribe({
    next: pet => {
      console.log('Pet adăugat:', pet);
      this.pets.push(pet);
      this.newPet = { name: '', type: '', breed: '', age: 0 };
    },
    error: err => {
      console.error('Eroare la addPet:', err);
    }
  });
}
 

  deletePet(id: number): void {
    this.petService.deletePet(id).subscribe(() => {
      this.pets = this.pets.filter(p => p.id !== id);
    });
  }
}
