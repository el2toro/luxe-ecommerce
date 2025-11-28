import { Component, inject, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from "@angular/router";
import { AuthStore } from '../../core/auth/auth.store';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, MatIconModule, RouterModule],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.scss',
})
export class AdminLayout {
auth = inject(AuthStore);
  router = inject(Router);

  title = signal('Dashboard');
  subtitle = signal('Welcome back, elite admin');

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
