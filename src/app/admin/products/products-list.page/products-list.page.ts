import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Product, ProductService } from '../../../core/services/product.service';

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   stock: number;
//   status: 'published' | 'draft';
//   images: string[];
// }

@Component({
  selector: 'app-products-list.page',
  imports: [RouterModule, CommonModule, MatButtonModule],
  templateUrl: './products-list.page.html',
  styleUrl: './products-list.page.scss',
})
export class ProductsListPage implements OnInit {
 private productService = inject(ProductService);

 get products$(){
  return this.productService.currentProducts$;
 }
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts().subscribe();
  }

  delete(productId: any) {
   this.productService.deleteProduct(productId).subscribe()
  }
}
