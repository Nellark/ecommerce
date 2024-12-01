import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthResponse, AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
onLogin() {
throw new Error('Method not implemented.');
}
  loginForm: FormGroup;
  registerForm!: FormGroup<any>;
isLoginMode: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: (response: AuthResponse) => {
          console.log('Login successful', response);
          this.authService.saveUserToLocalStorage(response); // Make sure to save the user data
          this.router.navigate(['/home']); // Navigate to the home page
        },
        error: (error: any) => {
          console.error('Login failed', error);
        },
      });
    }
  }
}
