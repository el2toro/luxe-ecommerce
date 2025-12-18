import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthStore } from '@core/auth/auth.store';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.page.html',
  styleUrl: './forgot-password.page.scss',
})
export class ForgotPage {
  private fb = inject(FormBuilder);
  private authStore = inject(AuthStore);
  private router = inject(Router);
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  sendReset() {
    this.authStore.resetPassword('email').subscribe({
      next: (response) => {
        console.log('email ok'); 
        this.router.navigate(['reset-password']);
      } 
    })
  }
}
