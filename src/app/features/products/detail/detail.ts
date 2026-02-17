import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../layout/header/header.component";
import { CommonModule } from '@angular/common';
import { CartStore } from '../../../core/store/cart.store';
import { ActivatedRoute, Router } from '@angular/router';
import { CatalogService } from '@core/services/catalog.service';
import { Product } from '@models/catalog/product.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-detail',
  imports: [HeaderComponent, CommonModule],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
})

export class Detail implements OnInit{
  private cart = inject(CartStore);
  private catalogService = inject(CatalogService);
  private  route = inject(ActivatedRoute);
  private router = inject(Router);
  size = 'M';
  color = '#1a1a1a';
  colors = ['#1a1a1a', '#8b4513', '#f5f5f5', '#2c2c2c'];

  product!: Product;

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id') as string;
    this.catalogService.getProductById(productId).subscribe({
      next: (product) => {
        this.product = product;
      }
    });
  }

  addToCart(){
  // this.cart.addItem(this.product);
  }

  buyNow(){
    this.router.navigate(['/checkout'])
  }
}
