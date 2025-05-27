import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrlAuth = 'http://localhost:8080/api/auth';
private baseUrlUser = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) {}

 login(username: string, password: string): Observable<any> {
  return this.http.post<{ token: string }>(`${this.baseUrlAuth}/login`, { username, password })
    .pipe(tap(response => {
      if (response && response.token) {
        localStorage.setItem('jwt', response.token);
      }
    }));
}

  register(username: string, password: string, fullName: string, email: string, phone: string) {
  return this.http.post(`${this.baseUrlAuth}/register`, { username, password, fullName, email, phone });
}
 getProfile(): Observable<any> {
    return this.http.get(`${this.baseUrlUser}/me`);
  }
  isLoggedIn(): boolean {
  return !!localStorage.getItem('jwt');
}
logout() {
  localStorage.removeItem('jwt');
}
changeEmail(email: string) {
  return this.http.put(`${this.baseUrlUser}/me/email`, { email });
}

changePhone(phone: string) {
  return this.http.put(`${this.baseUrlUser}/me/phone`, { phone });
}

changePassword(oldPassword: string, newPassword: string) {
  return this.http.put(`${this.baseUrlAuth}/change-password`, { oldPassword, newPassword });
}

}
