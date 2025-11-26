import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthStore } from '../../../core/auth/auth.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, MatIconModule, CommonModule, FormsModule, RouterModule ]
})
export class LoginComponent implements OnInit {
  showPass = false;
  remember = true;
  form!:  FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthStore,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
    email: ['alexander@luxe.com', [Validators.required, Validators.email]],
    password: ['password123', Validators.required]
  });
  }

  login() {
    // Fake success (replace with real API call)
    this.auth.login('fake-jwt-token-123', {
      id: '1',
      name: 'Alexander Voss',
      email: 'alexander@luxe.com',
      isElite: true
    });
    this.router.navigate(['/']);
  }
}
