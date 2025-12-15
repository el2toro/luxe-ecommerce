import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { AuthStore } from '../../../core/auth/auth.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account.page',
  imports: [HeaderComponent, MatIconModule],
  templateUrl: './account.page.html',
  styleUrl: './account.page.scss',
})
export class AccountPage {
  private authStore = inject(AuthStore);
  private router = inject(Router);
  user = this.authStore.user();

  signOut() {
    this.authStore.logout();
    this.router.navigate(['/']);
  }
}
