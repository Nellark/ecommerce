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

  constructor() {

    const storedUsers = localStorage.getItem('users');
    this.users = storedUsers ? JSON.parse(storedUsers) : [];
  }

  register(userData: UserInterface): void {
    const userEmail = userData.email;

    if (this.users.some((user) => user.email === userEmail)) {
      this.messageSubject.next('Email already taken');
      return;
    }

    this.users.push(userData);

    localStorage.setItem('users', JSON.stringify(this.users));
    localStorage.setItem('currentUser', JSON.stringify(userData));
    localStorage.setItem('auth', 'true');

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
    
      const preLoginCart = localStorage.getItem('tempCart');
      const userCart = JSON.parse(localStorage.getItem('cart') || '[]');

    
      const mergedCart = preLoginCart ? [...userCart, ...JSON.parse(preLoginCart)] : userCart;

    
      localStorage.setItem('cart', JSON.stringify(mergedCart));
      localStorage.removeItem('tempCart'); 

    
      localStorage.setItem('auth', 'true');
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      this.isAuthenticated = true;

      this.messageSubject.next('Logged in successfully');
      this.router.navigateByUrl('/home');
    } else {
      this.messageSubject.next('Wrong details');
    }
  }

  addToCartBeforeLogin(item: any): void {
    const tempCart = JSON.parse(localStorage.getItem('tempCart') || '[]');
    tempCart.push(item);
    localStorage.setItem('tempCart', JSON.stringify(tempCart));
  }

  isAuthenticatedUser(): boolean {
    return localStorage.getItem('auth') === 'true';
  }

  logout(): void {
    localStorage.removeItem('auth');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('cart');
    localStorage.removeItem('wishlist');
    this.isAuthenticated = false;

    this.router.navigate(['/home']);
  }

  getUserData(): UserInterface | null {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }

  getUsername(): string {
    const userData = this.getUserData();
    return userData ? userData.username : 'Guest';
  }
}
