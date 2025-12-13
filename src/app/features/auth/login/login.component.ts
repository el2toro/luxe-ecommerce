import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthStore } from '../../../core/auth/auth.store';
import { AuthModel as AuthRequestModel } from '@models/auth/auth-request.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, MatIconModule, CommonModule, FormsModule, RouterModule],
})
export class LoginComponent implements OnInit {
  showPass = false;
  form!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthStore, private router: Router) {}
  ngOnInit(): void {
    this.buildForm();
  }

  login() {
    const authRequest: AuthRequestModel = { ...this.form.value };
    this.auth.login(authRequest).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => console.log(error),
    });
  }

  buildForm() {
    this.form = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
      rememberMe: [false],
    });
  }
}
