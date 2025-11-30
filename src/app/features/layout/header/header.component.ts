import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MiniCart } from '../../../shared/components/mini-cart/mini-cart';
import { AuthStore } from '../../../core/auth/auth.store';
import { RouterModule } from '@angular/router';
import { SideMenuComponent } from '../side-menu/side-menu.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [MatIconModule, CommonModule, MiniCart, RouterModule, SideMenuComponent],
})
export class HeaderComponent implements OnInit {
  auth = inject(AuthStore);
  menuOpen = false;

  get isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }
  constructor() {}

  ngOnInit() {}

  openMenu() {
    this.menuOpen = true;
  }

  closeMenu() {
    this.menuOpen = false;
  }
}
