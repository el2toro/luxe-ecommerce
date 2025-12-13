import { Component, signal } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { CartDrawer } from "./features/cart/cart-drawer/cart-drawer";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CartDrawer, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('luxe-ecommerce');

  //TODO: use a store state or a service
  get cartOpen() : boolean{
    return document.body.classList.contains('cart-open');
  }
}
