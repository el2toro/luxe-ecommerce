import { Injectable } from '@angular/core';
import { Product } from '@models/catalog/product.model';
import { ComponentStore } from '@ngrx/component-store';


interface ProductState {
  items: Product[];
}

@Injectable({ providedIn: 'root' })
export class ProductStore extends ComponentStore<ProductState> {
  constructor() {
    super({ items: []});
  }

  readonly removeItem = this.updater((state, id: number) => ({
    ...state,
   // items: state.items.filter(i => i.id !== id)
  }));

  // Selectors
  readonly items$ = this.select(state => 'items');
  readonly totalItems$ = this.select(state => state.items.length);

}