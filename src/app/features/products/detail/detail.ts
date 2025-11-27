import { Component, inject, OnInit } from '@angular/core';
import { BottomNavComponent } from "../../layout/bottom-nav/bottom-nav.component";
import { HeaderComponent } from "../../layout/header/header.component";
import { CommonModule } from '@angular/common';
import { CartStore } from '../../../core/store/cart.store';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductStore } from '../../../core/store/product.store';

@Component({
  selector: 'app-detail',
  imports: [BottomNavComponent, HeaderComponent, CommonModule],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
})
export class Detail implements OnInit{
  private cart = inject(CartStore);
  private productStore = inject(ProductStore);
  private  route = inject(ActivatedRoute);
  private router = inject(Router);
  size = 'M';
  color = '#1a1a1a';
  colors = ['#1a1a1a', '#8b4513', '#f5f5f5', '#2c2c2c'];

  product: any;
  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productStore.getProductById(productId);
  }

  addToCart(){
   this.cart.addItem(this.product);
  }

  buyNow(){
    this.router.navigate(['/checkout'])
  }
}
