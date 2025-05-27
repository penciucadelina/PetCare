
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service'

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [CommonModule, RouterOutlet, RouterModule, FormsModule], // adaugă FormsModule!
})
export class ProfileComponent {
  profile: any;
  error = '';
  message = '';

  newEmail = '';
  newPhone = '';
  oldPassword = '';
  newPassword = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
  this.authService.getProfile().subscribe({
    next: (data: any) => this.profile = data,
    error: (err: any) => this.error = 'Nu s-au putut încărca detaliile contului.'
  });
}

  updateEmail() {
    this.authService.changeEmail(this.newEmail).subscribe({
      next: () => this.message = 'Email actualizat cu succes!',
      error: () => this.message = 'Eroare la actualizarea emailului.'
    });
  }

  updatePhone() {
    this.authService.changePhone(this.newPhone).subscribe({
      next: () => this.message = 'Telefon actualizat cu succes!',
      error: () => this.message = 'Eroare la actualizarea telefonului.'
    });
  }

  changePassword() {
    this.authService.changePassword(this.oldPassword, this.newPassword).subscribe({
      next: () => this.message = 'Parola schimbată cu succes!',
      error: () => this.message = 'Eroare la schimbarea parolei.'
    });
  }
}