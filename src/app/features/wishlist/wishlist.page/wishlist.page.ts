import { Component } from '@angular/core';
import { BottomNavComponent } from "../../layout/bottom-nav/bottom-nav.component";
import { ProductCard } from "../../../shared/components/product-card/product-card";
import { HeaderComponent } from "../../layout/header/header.component";
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-wishlist.page',
  imports: [BottomNavComponent, ProductCard, HeaderComponent, MatIconModule, CommonModule],
  templateUrl: './wishlist.page.html',
  styleUrl: './wishlist.page.scss',
})
export class WishlistPage {
wishlist = [
    { id: 1, brand: 'ATELIER NOIR', name: 'Cashmere Coat', price: '4,800', image: 'https://images.unsplash.com/photo-1543508282-6313a1d3e1d4?w=600', wishlisted: true, sale: true },
    { id: 2, brand: 'SOLEIL', name: 'Diamond Tennis Bracelet', price: '18,500', image: 'https://images.unsplash.com/photo-1605100804761-9a47a9e49c5c?w=600', wishlisted: true },
    { id: 3, brand: 'LUXE', name: 'Silk Evening Gown', price: '12,000', image: 'https://images.unsplash.com/photo-1594223272480-4479c2c2f1aa?w=600', wishlisted: true, ar: true }
  ];

  removeFromWishlist(id: number) {
    this.wishlist = this.wishlist.filter(i => i.id !== id);
  }
}
