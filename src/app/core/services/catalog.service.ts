import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

export interface Product {
  id: string | null;
  name: string;
  description: string;
  sku: string;
  imageFile: string;
  price: string;
  rating: number;
  isAvailable: boolean;
  categories: any[];
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = 'https://localhost:7226/catalog';
  private httpClient = inject(HttpClient);
  private products = new BehaviorSubject<Product[]>([]);
  currentProducts$ = this.products.asObservable();

  getProducts() : Observable<any> {
   return this.httpClient.get<any[]>(`${this.baseUrl}`)
   .pipe(map((products) => this.products.next(products)));
  }

   getProductById(productId: string) : Observable<Product> {
     return this.httpClient.get<Product>(`${this.baseUrl}/products/${productId}`);
  }

  updateProduct(product: Product) : Observable<Product> {
     return this.httpClient.put<Product>(`${this.baseUrl}/products`, product);
  }

  createProduct(product: Product) : Observable<Product> {
     return this.httpClient.post<Product>(`${this.baseUrl}/products`, product);
  }

  deleteProduct(productId: string) : Observable<any> {
     return this.httpClient.delete<any>(`${this.baseUrl}/products/${productId}`);
  }
}
