import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isSignUpMode = false;
  signUpForm!: FormGroup;
  signInForm!: FormGroup;
  loggedInUser: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    // Restore logged-in user if exists
    this.loggedInUser = localStorage.getItem('loggedInUser');

    // Sign Up form
    this.signUpForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    // Sign In form
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  toggleMode() {
    this.isSignUpMode = !this.isSignUpMode;
  }

  onSignUp() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const newUser: User = this.signUpForm.value;
    let users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find((u) => u.email === newUser.email)) {
      alert('Email already registered!');
      return;
    }

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Sign Up Successful!');
    this.signUpForm.reset();
    this.toggleMode(); // Switch to Sign In
  }

  onSignIn() {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.signInForm.value;
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      this.loggedInUser = `${foundUser.fullname}`;
      localStorage.setItem('loggedInUser', this.loggedInUser);
      alert(`Welcome, ${this.loggedInUser}!`);
      this.signInForm.reset();
    } else {
      alert('Invalid email or password!');
    }
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.loggedInUser = null;
  }

  // Getters for template access
  get sUp() {
    return this.signUpForm.controls;
  }
  get sIn() {
    return this.signInForm.controls;
  }
}
