import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Product } from '@models/catalog/product.model';

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private baseUrl = 'https://localhost:7070/catalog-service/catalog';
  private httpClient = inject(HttpClient);
  private products = new BehaviorSubject<Product[]>([]);
  currentProducts$ = this.products.asObservable();

  getProducts() : void {
    this.httpClient.get<Product[]>(`${this.baseUrl}`)
   .pipe(map((products) => this.products.next(products)))
   .subscribe();
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
