import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  currentAuthStatus = this.isAuthenticated.asObservable();

  // Sign In
  login(email: string, password: string): boolean {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      this.isAuthenticated.next(true);
      return true;
    }
    return false;
  }

  // Sign Up
  register(user: User): void {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    this.isAuthenticated.next(true); 
  }

  logout(): void {
    this.isAuthenticated.next(false);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated.value;
  }
}
