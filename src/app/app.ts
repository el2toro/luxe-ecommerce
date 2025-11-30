import { Component, signal } from '@angular/core';
import { AuthStore } from './core/auth/auth.store';
import { RouterOutlet } from "@angular/router";
import { CartDrawer } from "./features/cart/cart-drawer/cart-drawer";
import { CommonModule } from '@angular/common';
import { LiveStylistChatComponent } from "./shared/components/live-stylist-chat/live-stylist-chat.component";
import { FooterComponent } from "./features/layout/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CartDrawer, CommonModule, LiveStylistChatComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('luxe-ecommerce');

  get cartOpen() : boolean{
    return document.body.classList.contains('cart-open');
  }
  constructor(private auth: AuthStore) {
   auth.init();
  }
}
