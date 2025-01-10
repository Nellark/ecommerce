import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from '../model/model.module';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: UserInterface[] = [];
  private isAuthenticated: boolean = false;

  private messageSubject = new BehaviorSubject<string>('');
  message$ = this.messageSubject.asObservable();

  router = inject(Router);

  constructor() {}

  register(userData: UserInterface): void {
    const userEmail = userData.email;

    if (this.users.some((user) => user.email === userEmail)) {
      this.messageSubject.next('Email already taken');
      return;
    }

    this.users.push(userData);
    this.messageSubject.next('Registered successfully');
    this.router.navigateByUrl('/login');
  }

  login(userData: UserInterface): void {
    const foundUser = this.users.find(
      (user) =>
        user.username === userData.username &&
        user.password === userData.password
    );

    if (foundUser) {
      localStorage.removeItem('cart');
      
   
      localStorage.setItem('auth', 'true');
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      this.isAuthenticated = true;

      this.messageSubject.next('Logged in successfully');
      this.router.navigateByUrl('/home');
    } else {
      this.messageSubject.next('Wrong details');
    }
  }

  isAuthenticatedUser(): boolean {
    return localStorage.getItem('auth') === 'true';
  }

  logout(): void {
    localStorage.removeItem('auth');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cart');  
    this.isAuthenticated = false;
    this.router.navigate(['/home']);
  }

  getUserData(): any {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }
}
