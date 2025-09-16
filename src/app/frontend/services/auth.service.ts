import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserInterface } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getUserData(): { username: string; } | null {
    throw new Error('Method not implemented.');
  }
  register(userData: { email: string; username: string; password: string; }) {
    throw new Error('Method not implemented.');
  }
  logout() {
    throw new Error('Method not implemented.');
  }
  private messageSubject = new BehaviorSubject<string>('');
  public message$ = this.messageSubject.asObservable();

  users: UserInterface[] = JSON.parse(localStorage.getItem('users') || '[]');

  constructor(private router: Router) {}

  isAuthenticatedUser(): boolean {
    return localStorage.getItem('authToken') !== null;
  }

  onSignup(userData: UserInterface): void {
    const userExists = this.users.some(user => user.username === userData.username);
    if (userExists) {
      alert(`${userData.username} is already taken`);
      return;
    }

    this.users.push(userData);
    localStorage.setItem('users', JSON.stringify(this.users));
    alert('Registered successfully!');
    this.router.navigate(['/login']);
  }

  login(userData: { username: string; password: string }): Observable<string> {
    return new Observable(observer => {
      const foundUser = this.users.find(
        user => user.username === userData.username && user.password === userData.password
      );

      if (foundUser) {
        this.messageSubject.next('Login successful!');
        localStorage.setItem('authToken', 'dummy-token');
        observer.next('Login successful!');
      } else {
        this.messageSubject.next('Username or password incorrect');
        observer.next('Username or password incorrect');
      }

      observer.complete();
    });
  }
}
