import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthResponse, AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
onLogin() {
throw new Error('Method not implemented.');
}
  registerForm: FormGroup;
isLoginMode: any;
loginForm: FormGroup<any>;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response: AuthResponse) => {
          console.log('Registration successful', response);
          this.authService.saveUserToLocalStorage(response);
          this.router.navigate(['/login']); 
        },
        error: (error: any) => {
          console.error('Registration failed', error);
        },
      });
    }
  }
}
