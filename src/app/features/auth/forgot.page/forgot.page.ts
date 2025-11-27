import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot.page',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './forgot.page.html',
  styleUrl: './forgot.page.scss',
})
export class ForgotPage {
  private fb = inject(FormBuilder);
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor() {}

  sendReset() {
    alert(`Reset link sent to ${this.form.value.email}`);
  }
}
