import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

export interface AuthResponse {
  user: { id: number; username: string; email: string; phoneNumber: string }; // Include phone number if available
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(userData: { username: string; email: string; password: string; phoneNumber: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.SERVER}/register`, userData);
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.SERVER}/login`, { email, password });
  }

  logout() {
    localStorage.removeItem('currentUser'); 
  
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('currentUser'); 
  }

 
  saveUserToLocalStorage(authResponse: AuthResponse) {
    const userDetails = {
      id: authResponse.user.id,
      username: authResponse.user.username,
      email: authResponse.user.email,
      phoneNumber: authResponse.user.phoneNumber 
    };
    localStorage.setItem('currentUser', JSON.stringify({ ...userDetails, token: authResponse.token }));
  }

  
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }
}
