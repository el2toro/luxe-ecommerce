import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthStore } from '../../../core/auth/auth.store';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup.page',
  imports: [MatIconModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './signup.page.html',
  styleUrl: './signup.page.scss',
})
export class SignupPage implements OnInit {
  private fb = inject(FormBuilder);
  private auth = inject(AuthStore);
  private router = inject(Router);
  showPass = false;
  strength = 0;
  strengthText = 'Password strength';
  form!: FormGroup;

  ngOnInit(): void {
    this.buildForm();
  }

  calculateStrength(pass: string) {
    let score = 0;
    if (pass.length >= 8) score += 25;
    if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) score += 25;
    if (pass.match(/\d/)) score += 25;
    if (pass.match(/[^a-zA-Z\d]/)) score += 25;
    this.strength = score;
    if (score < 50) this.strengthText = 'Weak';
    else if (score < 75) this.strengthText = 'Good';
    else this.strengthText = 'Strong';
  }

  signup() {
    const signupData = {...this.form.value};
    this.auth.signup(signupData).subscribe({
      next: (res) => this.router.navigate(['/login']),
      error: (err) => console.error('Signup failed', err),
    });
  }

  buildForm(){
  this.form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    terms: [false, Validators.requiredTrue],
  });

  this.form.get('password')?.valueChanges.subscribe((pass) => {
      this.calculateStrength(pass || '');
    });
  }
}
