import { Injectable } from '@angular/core';
import { CartItemModel } from '@models/cart-item.model';
import { ComponentStore } from '@ngrx/component-store';


interface CartState {
  items: CartItemModel[];
  promoCode: string;
}

@Injectable({ providedIn: 'root' })
export class CartStore extends ComponentStore<CartState> {
  constructor() {
    super({ items: [], promoCode: '' });
  }

  readonly addItem = this.updater((state, item: CartItemModel) => ({
    ...state,
    items: [...state.items, { ...item, quantity: 1 }]
  }));

  readonly updateQuantity = this.updater((state, { id, quantity }: { id: string; quantity: number }) => ({
    ...state,
    items: state.items.map(i => i.productId === id ? { ...i, quantity: Math.max(1, quantity) } : i)
  }));

  readonly removeItem = this.updater((state, id: string) => ({
    ...state,
    items: state.items.filter(i => i.productId !== id)
  }));

  readonly applyPromo = this.updater((state, code: string) => ({ ...state, promoCode: code }));

  // Selectors
  readonly items$ = this.select(state => state.items);
  readonly totalItems$ = this.select(state => state.items.reduce((sum, i) => sum + i.quantity, 0));
  readonly subtotal$ = this.select(state => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0));
  readonly discount$ = this.select(state => state.promoCode === 'LUXE25' ? 0.25 : 0);
  readonly total$ = this.select(this.subtotal$, this.discount$, (sub, disc) => sub * (1 - disc));
}