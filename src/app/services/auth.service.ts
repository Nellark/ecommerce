import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from '../model/model.module';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: UserInterface[] = [];
  private isAuthenticated: boolean = false;


  private messageSubject = new BehaviorSubject<string>('');
  message$ = this.messageSubject.asObservable();

  router = inject(Router);

  constructor() {}

  register(userData: UserInterface): void {
    const userEmail = userData.email;

    if (this.user.some((user) => user.email === userEmail)) {
      this.messageSubject.next('Email already taken');
      return;
    }

    this.user.push(userData);
    this.messageSubject.next('Registered successfully');
    this.router.navigateByUrl('/login');
  }

  login(userData: UserInterface): void {
    const foundUser = this.user.find(
      (user) => user.username === userData.username && user.password === userData.password
    );

    if (foundUser) {
      localStorage.setItem('auth', 'true');
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
    this.router.navigate(['/home']);
  }
}
