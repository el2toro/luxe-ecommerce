import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CartModel } from '@models/cart.model';
import { BehaviorSubject, map, Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class CartService {
  private baseUrl = 'https://localhost:7269/cart';
  private httpClient = inject(HttpClient);
private cart = new BehaviorSubject<CartModel>({id: '', customerId: '', cartItems: [], total: 0, subtotal: 0});
private cartItems = new BehaviorSubject<number>(0);
currentCart$ = this.cart.asObservable();
currentCartItems$ = this.cartItems.asObservable();

  addItemToCart(item: any) {
    this.httpClient.post<CartModel>(`${this.baseUrl}/item`, item)
   .pipe(map((cart) => {
        this.cart.next(cart);
        this.cartItems.next(cart.cartItems.length);
        console.log('itemAdded: ', cart)
   })).subscribe();
  }

  getCart(customerId: string){
    this.httpClient.get<CartModel>(`${this.baseUrl}/${customerId}`)
    .pipe(map((cart) => {
        this.cart.next(cart)
        this.cartItems.next(cart.cartItems.length)
        console.log('minicart init: ', cart)
    })).subscribe()
  }
}