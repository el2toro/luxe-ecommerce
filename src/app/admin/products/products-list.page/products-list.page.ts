import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {  CatalogService } from '../../../core/services/catalog.service';

@Component({
  selector: 'app-products-list.page',
  imports: [RouterModule, CommonModule, MatButtonModule],
  templateUrl: './products-list.page.html',
  styleUrl: './products-list.page.scss',
})
export class ProductsListPage implements OnInit {
 private productService = inject(CatalogService);

 get products$(){
  return this.productService.currentProducts$;
 }
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.productService.getProducts();
  }

  delete(productId: any) {
   this.productService.deleteProduct(productId).subscribe()
  }
}
