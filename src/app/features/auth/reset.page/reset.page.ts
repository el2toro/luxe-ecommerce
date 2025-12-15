import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-reset.page',
  imports: [MatInputModule, MatIconModule, MatSnackBarModule, MatProgressSpinnerModule, MatCheckboxModule, MatFormFieldModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './reset.page.html',
  styleUrl: './reset.page.scss',
})
export class ResetPasswordPage {
resetForm: FormGroup;
  token: string = '';
  loading = false;
  success = false;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.resetForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {
    // this.token = this.route.snapshot.queryParamMap.get('token') || '';
    // if (!this.token) {
    //   this.snackBar.open('Invalid or missing token', 'Close', { duration: 5000 });
    //   this.router.navigate(['/login']);
    // }
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  async resetPassword() {
    if (this.resetForm.invalid) return;

    this.loading = true;

    try {
      // Replace with your real API call
      // await this.authService.resetPassword(this.token, this.resetForm.value.password);

      // Fake success for demo
      await new Promise(resolve => setTimeout(resolve, 2000));

      this.success = true;
      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.snackBar.open('Failed to reset password. Token may be expired.', 'Close', { duration: 5000 });
    }
  }
}
