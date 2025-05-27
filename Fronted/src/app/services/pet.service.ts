import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet, PetDTO } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private apiUrl = 'http://localhost:8080/pets';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // sau din AuthService
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  addPet(pet: PetDTO): Observable<Pet> {
    return this.http.post<Pet>(this.apiUrl, pet, { headers: this.getHeaders() });
  }

  deletePet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
