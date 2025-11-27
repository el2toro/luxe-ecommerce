import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MiniCart } from "../../../shared/components/mini-cart/mini-cart";
import { AuthStore } from '../../../core/auth/auth.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [MatIconModule, CommonModule, MiniCart]
})
export class HeaderComponent implements OnInit {
  auth = inject(AuthStore)

  get isAuthenticated() : boolean{
    return this.auth.isAuthenticated();
  }
  constructor() { }

  ngOnInit() {
    
  }

}
