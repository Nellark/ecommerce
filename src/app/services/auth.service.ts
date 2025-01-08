import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'https://example.com/api/auth'; 
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}


  isLoggedIn$ = this.isLoggedInSubject.asObservable();


  login(username: string, password: string) {
    const credentials = { username, password };
    return this.http.post(`${this.apiUrl}/login`, credentials).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);
        this.isLoggedInSubject.next(true);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('Invalid username or password.');
      },
    });
  }


  signup(username: string, password: string) {
    const userDetails = { username, password };
    return this.http.post(`${this.apiUrl}/signup`, userDetails).subscribe({
      next: () => {
        alert('Signup successful! Please log in.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Signup failed:', err);
        alert('Unable to register. Please try again.');
      },
    });
  }


  logout() {
    localStorage.removeItem('token');
    this.isLoggedInSubject.next(false);
    this.router.navigate(['/login']);
  }


  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
