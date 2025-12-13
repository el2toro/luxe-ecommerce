import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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
  showPass = false;
  strength = 0;
  strengthText = 'Password strength';

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    terms: [false, Validators.requiredTrue],
  });

  constructor(private auth: AuthStore, private router: Router) {
    this.form.get('password')?.valueChanges.subscribe((pass) => {
      this.calculateStrength(pass || '');
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
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
    // Mock success
   // this.auth.signup();
    this.router.navigate(['/']);
  }
}
