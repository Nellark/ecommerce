import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // Login form
  email = '';
  password = '';
  rememberMe = false;

  // Register form
  showRegister = false;
  firstName = '';
  lastName = '';
  registerEmail = '';
  registerPassword = '';
  confirmPassword = '';
  agreeTerms = false;

  onLogin(): void {
    console.log('Login:', { email: this.email, password: this.password });
    // Implement login logic here
  }

  onRegister(): void {
    if (this.registerPassword !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    console.log('Register:', {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.registerEmail,
      password: this.registerPassword
    });
    // Implement registration logic here
  }

  switchToRegister(): void {
    this.showRegister = true;
  }

  switchToLogin(): void {
    this.showRegister = false;
  }
}