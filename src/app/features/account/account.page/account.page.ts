import { Component, inject, OnInit } from '@angular/core';
import { BottomNavComponent } from "../../layout/bottom-nav/bottom-nav.component";
import { HeaderComponent } from "../../layout/header/header.component";
import { MatIconModule } from '@angular/material/icon';
import { AuthStore } from '../../../core/auth/auth.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account.page',
  imports: [BottomNavComponent, HeaderComponent, MatIconModule],
  templateUrl: './account.page.html',
  styleUrl: './account.page.scss',
})
export class AccountPage {
private authStore = inject(AuthStore);
private router = inject(Router)
user = this.authStore.user();

  signOut(){
   this.authStore.logout();
   this.router.navigate(['/']);
  }
}
