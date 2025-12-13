import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from "../layout/header/header.component";
import { CartStore } from '../../core/store/cart.store';
import { CartService } from '@core/services/cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  imports: [MatIconModule, CommonModule, FormsModule, MatButtonModule, HeaderComponent]
})
export class ShopComponent implements OnInit {
  private cartService = inject(CartService);
  private cartStore = inject(CartStore);
  gridView = true;
  sortBy = 'newest';
  
  filters = {
    watches: false,
    jewelry: false,
    bags: false,
    couture: false,
    brand: '',
    maxPrice: 1000000
  };

  products = [
  // WATCHES
  { id: 1, name: 'Patek Philippe Nautilus 5711/1A-014 Tiffany Blue', brand: 'Patek Philippe', price: 2840000, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800', category: 'watches', rarity: '1 of 170', sold: false, wishlisted: false },
  { id: 2, name: 'Rolex Daytona "Eye of the Tiger" 116588TBR', brand: 'Rolex', price: 895000, image: 'https://images.unsplash.com/photo-1541781777318-3e99e4e9b98d?w=800', category: 'watches', rarity: 'Limited', sold: false, wishlisted: false },
  { id: 3, name: 'Audemars Piguet Royal Oak Rainbow 41mm', brand: 'Audemars Piguet', price: 1780000, image: 'https://images.unsplash.com/photo-1605100804761-9a47a9e49c5c?w=800', category: 'watches', rarity: '1 of 50', sold: true, wishlisted: false },
  { id: 4, name: 'Richard Mille RM 11-03 McLaren', brand: 'Richard Mille', price: 2450000, image: 'https://images.unsplash.com/photo-1615825981350-3081c5e8e3e8?w=800', category: 'watches', rarity: '1 of 500', sold: false, wishlisted: false },
  { id: 5, name: 'Patek Philippe Grand Complications 6300G', brand: 'Patek Philippe', price: 4200000, image: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e55a?w=800', category: 'watches', rarity: 'Masterpiece', sold: false, wishlisted: false },

  // HANDBAGS
  { id: 6, name: 'Hermès Birkin 25 Himalaya Niloticus', brand: 'Hermès', price: 485000, image: 'https://images.unsplash.com/photo-1584912007066-7f7f2f5c8e4d?w=800', category: 'bags', rarity: '1 of 3', sold: true, wishlisted: false },
  { id: 7, name: 'Hermès Kelly 28 Rose Sakura Swift', brand: 'Hermès', price: 298000, image: 'https://images.unsplash.com/photo-1598532293350-971b3f6e9c0f?w=800', category: 'bags', rarity: 'Special Order', sold: false, wishlisted: false },
  { id: 8, name: 'Chanel Diamond Forever Classic Flap', brand: 'Chanel', price: 385000, image: 'https://images.unsplash.com/photo-1594223272954-6f05d65e9e8c?w=800', category: 'bags', rarity: '13 worldwide', sold: true, wishlisted: false },
  { id: 9, name: 'Louis Vuitton x Supreme Trunk', brand: 'Louis Vuitton', price: 168000, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800', category: 'bags', rarity: 'Archive', sold: false, wishlisted: false },

  // JEWELRY
  { id: 10, name: 'Graff High Jewelry Emerald Suite', brand: 'Graff', price: 12000000, image: 'https://images.unsplash.com/photo-1605100804761-9a47a9e49c5c?w=800', category: 'jewelry', rarity: 'One of One', sold: false, wishlisted: false },
  { id: 11, name: 'Van Cleef & Arpels Zip Necklace Transformable', brand: 'Van Cleef & Arpels', price: 2800000, image: 'https://images.unsplash.com/photo-1598532293350-971b3f6e9c0f?w=800', category: 'jewelry', rarity: 'Haute Joaillerie', sold: false, wishlisted: false },
  { id: 12, name: 'Cartier Panthère High Jewelry Necklace', brand: 'Cartier', price: 3800000, image: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e55a?w=800', category: 'jewelry', rarity: 'Secret Piece', sold: false, wishlisted: false },

  // MORE WATCHES
  { id: 13, name: 'F.P. Journe Tourbillon Souverain', brand: 'F.P. Journe', price: 890000, image: 'https://images.unsplash.com/photo-1541781777318-3e99e4e9b98d?w=800', category: 'watches', rarity: 'Boutique Only', sold: false, wishlisted: false },
  { id: 14, name: 'A. Lange & Söhne Zeitwerk Minute Repeater', brand: 'A. Lange & Söhne', price: 1450000, image: 'https://images.unsplash.com/photo-1615825981350-3081c5e8e3e8?w=800', category: 'watches', rarity: '10 pieces', sold: true, wishlisted: false },
  { id: 15, name: 'Greubel Forsey Double Balancier Sapphire', brand: 'Greubel Forsey', price: 980000, image: 'https://images.unsplash.com/photo-1605100804761-9a47a9e49c5c?w=800', category: 'watches', rarity: 'Unique Piece', sold: false, wishlisted: false },

  { id: 16, name: 'Jacob & Co. Bugatti Chiron Tourbillon', brand: 'Jacob & Co.', price: 1900000, image: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e55a?w=800', category: 'watches', rarity: '1 of 1', sold: false },
{ id: 17, name: 'Boucheron Quatre Ring Full Diamond', brand: 'Boucheron', price: 485000, image: 'https://images.unsplash.com/photo-1598532293350-971b3f6e9c0f?w=800', category: 'jewelry', rarity: 'High Jewelry', sold: false },
{ id: 18, name: 'Dior Couture Gown FW25', brand: 'Dior', price: 125000, image: 'https://images.unsplash.com/photo-1594223272954-6f05d65e9e8c?w=800', category: 'couture', rarity: 'Runway Piece', sold: true },
{ id: 19, name: 'Bulgari Serpenti Secret Watch', brand: 'Bulgari', price: 780000, image: 'https://images.unsplash.com/photo-1541781777318-3e99e4e9b98d?w=800', category: 'watches', rarity: 'Secret Watch', sold: false },
{ id: 20, name: 'Chopard Happy Sport Diamond Watch', brand: 'Chopard', price: 285000, image: 'https://images.unsplash.com/photo-1605100804761-9a47a9e49c5c?w=800', category: 'watches', rarity: 'Full Diamond', sold: false },
];

  filteredProducts = [...this.products];
  cartItems: any[] = [];
  wishlist: number[] = [];

  constructor() { }

  ngOnInit() {
  }

  toggleView() {
    this.gridView = !this.gridView;
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(p => {
      const catMatch = !Object.values(this.filters).some((v, i) => 
        v && !p.category.includes(Object.keys(this.filters)[i])
      );
      const priceMatch = p.price <= this.filters.maxPrice;
      const brandMatch = !this.filters.brand || p.brand === this.filters.brand;
      return catMatch && priceMatch && brandMatch;
    });
  }

  clearFilters() {
    this.filters = { watches: false, jewelry: false, bags: false, couture: false, brand: '', maxPrice: 1000000 };
    this.filteredProducts = [...this.products];
  }

  sortProducts() {
    // implement sorting logic
  }

  addToCart(product: any) {
    //this.cartItems.push(product);
    // Add animation feedback

  this.cartService.addItemToCart({
    customerId: 'c9f1f7bd-7a2e-4581-96b0-e017069c895e', 
    productId: '123E4567-E89B-12D3-A456-426614174005', 
    quantity: 2, 
    currency: 2})
  }

  toggleWishlist(product: any) {
    product.wishlisted = !product.wishlisted;
  }

  openCart() {
    // Open cart sidebar/modal
  }
}
