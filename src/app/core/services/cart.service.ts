import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CartModel } from '@models/cart.model';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private baseUrl = 'http://localhost:7000/cart-service/cart';
  private httpClient = inject(HttpClient);
 private cart = new BehaviorSubject<CartModel>({id: '', customerId: '', cartItems: [], total: 0, subtotal: 0});
 currentCart$ = this.cart.asObservable();

  addItemToCart(cartRequest: any) {
    this.httpClient.post<CartModel>(`${this.baseUrl}/item`, cartRequest, { withCredentials: true })
   .pipe(map((cart) =>  this.cart.next(cart)))
   .subscribe();
  }

  removeFromCart(cartRequest: any) {
    this.httpClient
     .put<CartModel>(`${this.baseUrl}/${'cartId'}/items/${cartRequest.cartId}`, cartRequest, { withCredentials: true })
     .pipe(map((cart) => this.cart.next(cart)))
     .subscribe();
  }

  getCart(){
    this.httpClient.get<CartModel>(`${this.baseUrl}`, { withCredentials: true })
    .pipe(map((cart) => this.cart.next(cart)))
    .subscribe()
  }
}